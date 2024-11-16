package tasks

import (
	"pocketbase-be/collections"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/routine"
)

type TasksHooks struct {
	app *pocketbase.PocketBase
}

func NewTasksHooks(app *pocketbase.PocketBase) *TasksHooks {
	return &TasksHooks{app}
}

func (h *TasksHooks) Register() {
	h.OnRecordAfterCreateRequest()
}

func (h *TasksHooks) OnRecordAfterCreateRequest() {
	h.app.OnRecordAfterCreateRequest(collections.TASKS).Add(func(e *core.RecordCreateEvent) error {
		fromUser, ok := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return nil
		}

		assigneeIds, ok := e.Record.Get("assigneeIds").([]string)
		toCreateNotificationAssigneeIds := make([]string, 0, len(assigneeIds))
		for _, assigneeId := range assigneeIds {
			if assigneeId == fromUser.Id {
				continue
			}
			toCreateNotificationAssigneeIds = append(toCreateNotificationAssigneeIds, assigneeId)
		}

		if !ok {
			return nil
		}

		if len(toCreateNotificationAssigneeIds) == 0 {
			return nil
		}

		collection, err := h.app.Dao().FindCollectionByNameOrId(collections.NOTIFICATION)
		if err != nil {
			return apis.NewBadRequestError("Failed to find notification collection", err)
		}

		routine.FireAndForget(func() {
			for _, assigneeId := range toCreateNotificationAssigneeIds {
				record := models.NewRecord(collection)
				record.Set("fromUserId", fromUser.Id)
				record.Set("userId", assigneeId)
				record.Set("taskId", e.Record.Get("id"))
				record.Set("message", "You have been assigned to a task")
				record.Set("seen", nil)
				record.Set("type", "ASSIGNED_TO_TASK")

				form := forms.NewRecordUpsert(h.app, record)
				form.Submit()
			}
		})

		return nil
	})
}
