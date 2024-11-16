package custom_apis

import (
	"math"
	"net/http"
	"pocketbase-be/libs/tasks"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type TasksApi struct {
	app   *pocketbase.PocketBase
	event *core.ServeEvent

	service *tasks.TaskService
}

func NewTasksApi(app *pocketbase.PocketBase, event *core.ServeEvent, service *tasks.TaskService) *TasksApi {
	return &TasksApi{app, event, service}
}

func (api *TasksApi) Register() {
	tasksGroup := api.event.Router.Group("/projects/:projectId/tasks", apis.RequireRecordAuth())
	api.listTasks(tasksGroup)
	api.createTask(tasksGroup)
	api.updateTaskOrderAndStatus(tasksGroup)
}

func (api *TasksApi) listTasks(tasksGroup *echo.Group) {
	type ListQueryParams struct {
		Status  string `query:"status" validate:"required"`
		Page    int64  `query:"page" default:"1" min:"1"`
		PerPage int64  `query:"perPage" default:"20" min:"1"`
	}

	tasksGroup.GET("", func(c echo.Context) error {
		user, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		projectId := c.PathParam("projectId")

		var queryParams ListQueryParams
		if err := c.Bind(&queryParams); err != nil {
			return apis.NewBadRequestError("Invalid request", err)
		}

		if err := api.service.AuthorizeUserForProject(projectId, user.Id); err != nil {
			return apis.NewForbiddenError("Unauthorized", err)
		}

		tasks, err := api.service.FetchTasksWithUserInfo(projectId, queryParams.Status, queryParams.Page, queryParams.PerPage)

		if err != nil {
			return apis.NewApiError(http.StatusInternalServerError, "Failed to list tasks", err)
		}

		totalTasks, err := api.service.CountTasks(projectId, queryParams.Status)
		if err != nil {
			return apis.NewApiError(http.StatusInternalServerError, "Failed to count tasks", err)
		}

		return c.JSON(http.StatusOK, Pagination[TaskDto]{
			Items:      mapTasksToDto(tasks),
			Page:       queryParams.Page,
			PerPage:    queryParams.PerPage,
			TotalItems: totalTasks,
			TotalPages: math.Ceil(float64(totalTasks) / float64(queryParams.PerPage)),
		})
	})
}

func (api *TasksApi) createTask(taskGroup *echo.Group) {
	type CreateTaskBody struct {
		Title       string   `json:"title" validate:"required"`
		Description string   `json:"description"`
		AssigneeIds []string `json:"assigneeIds" validate:"required"`
		Status      string   `json:"status" validate:"required"`
	}

	taskGroup.POST("", func(c echo.Context) error {
		user, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		projectId := c.PathParam("projectId")

		var body CreateTaskBody
		if err := c.Bind(&body); err != nil {
			return apis.NewBadRequestError("Invalid request", err)
		}

		if err := api.service.AuthorizeUserForProject(projectId, user.Id); err != nil {
			return apis.NewForbiddenError("Unauthorized", err)
		}

		task, err := api.service.CreateTask(c, tasks.CreateTaskDefinition{
			ProjectID:   projectId,
			Title:       body.Title,
			UserID:      user.Id,
			Description: body.Description,
			AssigneeIds: body.AssigneeIds,
			Status:      body.Status,
		})

		if err != nil {
			return apis.NewApiError(http.StatusInternalServerError, "Failed to create task", err)
		}

		return c.JSON(http.StatusCreated, mapTaskToDto(task))
	})
}

func (api *TasksApi) updateTaskOrderAndStatus(taskGroup *echo.Group) {
	type UpdateTaskOrderAndStatusBody struct {
		Status string  `json:"status" validate:"required"`
		Order  float64 `json:"order" validate:"required"`
	}

	taskGroup.PATCH("/:taskId/order-status", func(c echo.Context) error {
		user, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		projectId := c.PathParam("projectId")
		taskId := c.PathParam("taskId")

		var body UpdateTaskOrderAndStatusBody
		if err := c.Bind(&body); err != nil {
			return apis.NewBadRequestError("Invalid request", err)
		}

		if err := api.service.AuthorizeUserForProject(projectId, user.Id); err != nil {
			return apis.NewForbiddenError("Unauthorized", err)
		}

		if err := api.service.UpdateTaskOrderAndStatus(projectId, taskId, body.Status, body.Order); err != nil {
			return apis.NewApiError(http.StatusInternalServerError, "Failed to update task order and status", err)
		}

		return c.NoContent(http.StatusNoContent)
	})
}
