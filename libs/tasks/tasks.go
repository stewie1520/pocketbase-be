package tasks

import (
	"database/sql"
	"fmt"
	"net/http"
	"pocketbase-be/collections"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/types"
)

type TaskService struct {
	app *pocketbase.PocketBase
}

func NewTaskService(app *pocketbase.PocketBase) *TaskService {
	return &TaskService{app}
}

// AuthorizeUserForProject authorizes user for project
func (service *TaskService) AuthorizeUserForProject(projectId, userId string) error {
	count, err := service.app.Dao().FindRecordsByFilter(
		collections.PROJECT_COLLABORATION,
		"projectId = {:projectId} && userId = {:userId}",
		"-created", 1, 0,
		dbx.Params{"projectId": projectId, "userId": userId},
	)

	if err != nil || len(count) != 1 {
		return apis.NewForbiddenError("Forbidden", err)
	}
	return nil
}

// FetchTasksWithUserInfo fetches tasks with user info
func (service *TaskService) FetchTasksWithUserInfo(projectId string, filter TaskFilter, page int64, perPage int64) ([]TaskDefinition, error) {
	var tasks []struct {
		ID          string                  `db:"id"`
		Title       string                  `db:"title"`
		Description string                  `db:"description"`
		Status      string                  `db:"status"`
		ProjectID   string                  `db:"projectId"`
		UserID      string                  `db:"userId"`
		UserName    string                  `db:"userName"`
		UserEmail   string                  `db:"userEmail"`
		UserAvatar  string                  `db:"userAvatar"`
		AssigneeIDs types.JsonArray[string] `db:"assigneeIds"`
		Created     string                  `db:"created"`
		Updated     string                  `db:"updated"`
		Order       float64                 `db:"order"`
	}

	where := dbx.HashExp{"projectId": projectId}
	if filter.Status != "" {
		where["status"] = filter.Status
	}

	err := service.app.Dao().DB().Select(
		fmt.Sprintf("%s.id", collections.TASKS),
		"title",
		"description",
		"status",
		"projectId",
		"userId",
		fmt.Sprintf("%s.email as userEmail", collections.USERS),
		fmt.Sprintf("%s.name as userName", collections.USERS),
		fmt.Sprintf("%s.avatar as userAvatar", collections.USERS),
		"assigneeIds",
		fmt.Sprintf("%s.order as order", collections.TASKS),
		fmt.Sprintf("%s.created", collections.TASKS),
		fmt.Sprintf("%s.updated", collections.TASKS),
	).
		From(collections.TASKS).
		InnerJoin(collections.USERS, dbx.NewExp(
			fmt.Sprintf("%s.userId = %s.id", collections.TASKS, collections.USERS),
		)).
		OrderBy("order ASC").
		AndOrderBy(fmt.Sprintf("%s.created DESC", collections.TASKS)).
		Offset((page - 1) * perPage).
		Limit(perPage).
		Where(where).
		All(&tasks)

	tasksResponses := make([]TaskDefinition, 0)

	if err == sql.ErrNoRows {
		return tasksResponses, nil
	} else if err != nil {
		return nil, err
	}

	for _, task := range tasks {
		if task.AssigneeIDs == nil {
			task.AssigneeIDs = types.JsonArray[string]{}
		}

		assignees, err := service.fetchAssigneeDetails(task.AssigneeIDs)
		if err != nil {
			return nil, err
		}

		task := TaskDefinition{
			ID:          task.ID,
			Title:       task.Title,
			Description: task.Description,
			Status:      task.Status,
			ProjectID:   task.ProjectID,
			User: &UserDefinition{
				ID:     task.UserID,
				Email:  task.UserEmail,
				Name:   task.UserName,
				Avatar: task.UserAvatar,
			},
			Assignees: assignees,
			Created:   task.Created,
			Updated:   task.Updated,
			Order:     task.Order,
		}
		tasksResponses = append(tasksResponses, task)
	}

	return tasksResponses, nil
}

// CountTasks counts tasks
func (service *TaskService) CountTasks(projectId string, filter TaskFilter) (int64, error) {
	var count struct {
		Count int64 `db:"count"`
	}

	sql := fmt.Sprintf("SELECT COUNT(*) as count FROM %s WHERE projectId = {:projectId}", collections.TASKS)
	if filter.Status != "" {
		sql += " AND status = {:status}"
	}

	q := service.app.Dao().DB().NewQuery(sql)

	params := dbx.Params{
		"projectId": projectId,
	}

	if filter.Status != "" {
		params["status"] = filter.Status
	}

	q.Bind(params)

	err := q.One(&count)

	if err != nil {
		return 0, fmt.Errorf("failed to count tasks: %w", err)
	}

	return count.Count, nil
}

func (service *TaskService) CreateTask(context echo.Context, task CreateTaskDefinition) (*TaskDefinition, error) {
	if !service.checkIfAssigneeIdsValid(task.ProjectID, task.AssigneeIds) {
		return nil, apis.NewBadRequestError("Invalid assignee ids", nil)
	}

	collection, err := service.app.Dao().FindCollectionByNameOrId(collections.TASKS)
	if err != nil {
		return nil, fmt.Errorf("failed to find task collection: %w", err)
	}

	record := models.NewRecord(collection)
	record.Set("title", task.Title)
	record.Set("description", task.Description)
	record.Set("status", task.Status)
	record.Set("projectId", task.ProjectID)
	record.Set("userId", task.UserID)
	record.Set("assigneeIds", types.JsonArray[string](task.AssigneeIds))
	record.Set("order", 1)

	form := forms.NewRecordUpsert(service.app, record)

	event := new(core.RecordCreateEvent)
	event.HttpContext = context
	event.Collection = collection
	event.Record = record

	err = form.Submit(func(next forms.InterceptorNextFunc[*models.Record]) forms.InterceptorNextFunc[*models.Record] {
		return func(m *models.Record) error {
			event.Record = m

			return service.app.OnRecordBeforeCreateRequest().Trigger(event, func(e *core.RecordCreateEvent) error {
				if err := next(e.Record); err != nil {
					return apis.NewBadRequestError("Failed to create record.", err)
				}

				return service.app.OnRecordAfterCreateRequest().Trigger(event)
			})
		}
	})

	taskRecord := service.fetchTaskById(record.Id)

	if taskRecord == nil {
		return nil, apis.NewApiError(http.StatusInternalServerError, "Failed to create task", nil)
	}

	return taskRecord, err
}

func (service *TaskService) UpdateTaskOrderAndStatus(projectId, taskId, status string, order float64) error {
	q := service.app.Dao().DB().Update(collections.TASKS, dbx.Params{"status": status, "order": order}, dbx.HashExp{"projectId": projectId, "id": taskId})

	_, err := q.Execute()

	if err != nil {
		return err
	}

	return nil
}

func (service *TaskService) fetchTaskById(taskId string) *TaskDefinition {
	var task struct {
		ID          string                  `db:"id"`
		Title       string                  `db:"title"`
		Description string                  `db:"description"`
		Status      string                  `db:"status"`
		ProjectID   string                  `db:"projectId"`
		UserID      string                  `db:"userId"`
		UserName    string                  `db:"userName"`
		UserEmail   string                  `db:"userEmail"`
		UserAvatar  string                  `db:"userAvatar"`
		AssigneeIDs types.JsonArray[string] `db:"assigneeIds"`
		Created     string                  `db:"created"`
		Updated     string                  `db:"updated"`
	}

	err := service.app.Dao().DB().Select(
		fmt.Sprintf("%s.id", collections.TASKS),
		fmt.Sprintf("%s.title", collections.TASKS),
		fmt.Sprintf("%s.description", collections.TASKS),
		fmt.Sprintf("%s.status", collections.TASKS),
		fmt.Sprintf("%s.projectId", collections.TASKS),
		fmt.Sprintf("%s.userId", collections.TASKS),
		fmt.Sprintf("%s.email as userEmail", collections.USERS),
		fmt.Sprintf("%s.name as userName", collections.USERS),
		fmt.Sprintf("%s.avatar as userAvatar", collections.USERS),
		"assigneeIds",
		fmt.Sprintf("%s.created", collections.TASKS),
		fmt.Sprintf("%s.updated", collections.TASKS),
		fmt.Sprintf("%s.order as order", collections.TASKS),
	).
		From(collections.TASKS).
		InnerJoin(collections.USERS, dbx.NewExp(
			fmt.Sprintf("%s.userId = %s.id", collections.TASKS, collections.USERS),
		)).
		Where(dbx.HashExp{fmt.Sprintf("%s.id", collections.TASKS): taskId}).
		One(&task)

	if err == sql.ErrNoRows {
		return nil
	}

	if err != nil {
		return nil
	}

	assignees, err := service.fetchAssigneeDetails(task.AssigneeIDs)
	if err != nil {
		return nil
	}

	return &TaskDefinition{
		ID:          task.ID,
		Title:       task.Title,
		Description: task.Description,
		Status:      task.Status,
		ProjectID:   task.ProjectID,
		User: &UserDefinition{
			ID:     task.UserID,
			Email:  task.UserEmail,
			Name:   task.UserName,
			Avatar: task.UserAvatar,
		},
		Assignees: assignees,
		Created:   task.Created,
		Updated:   task.Updated,
	}
}

func (service *TaskService) fetchAssigneeDetails(assigneeIDs []string) ([]UserDefinition, error) {
	var assignees []UserDefinition
	if len(assigneeIDs) == 0 {
		return []UserDefinition{}, nil
	}

	assigneeIDsInterface := make([]interface{}, len(assigneeIDs))
	for i, id := range assigneeIDs {
		assigneeIDsInterface[i] = id
	}

	err := service.app.Dao().DB().Select("id", "email", "avatar", "name").
		From(collections.USERS).
		Where(dbx.In("id", assigneeIDsInterface...)).
		All(&assignees)

	if err == sql.ErrNoRows {
		return []UserDefinition{}, nil
	}

	if err != nil {
		return nil, fmt.Errorf("failed to fetch assignee details: %w", err)
	}

	return assignees, nil
}

func (service *TaskService) checkIfAssigneeIdsValid(projectId string, assigneeIds []string) bool {
	if len(assigneeIds) == 0 {
		return true
	}

	q := service.app.Dao().DB().Select("COUNT(*) as count")
	q.From(collections.PROJECT_COLLABORATION)
	q.Where(dbx.HashExp{"projectId": projectId})

	assigneeIDsInterface := make([]interface{}, len(assigneeIds))
	for i, id := range assigneeIds {
		assigneeIDsInterface[i] = id
	}

	q.AndWhere(dbx.In("userId", assigneeIDsInterface...))
	var count struct {
		Count int `db:"count"`
	}

	err := q.One(&count)

	if err != nil {
		return false
	}

	fmt.Println(count.Count, len(assigneeIds))

	return count.Count == len(assigneeIds)
}
