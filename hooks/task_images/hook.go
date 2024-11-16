package task_images

import (
	"pocketbase-be/collections"
	"pocketbase-be/libs/tasks"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type TaskImagesHooks struct {
	app         *pocketbase.PocketBase
	taskService *tasks.TaskService
}

func NewTaskImagesHooks(app *pocketbase.PocketBase, taskService *tasks.TaskService) *TaskImagesHooks {
	return &TaskImagesHooks{app, taskService}
}

func (h *TaskImagesHooks) Register() {
	h.onRecordBeforeCreateRequest()
	h.OnRecordViewRequest()
}

func (h *TaskImagesHooks) onRecordBeforeCreateRequest() {
	h.app.OnRecordBeforeCreateRequest(collections.TASK_IMAGES).Add(func(e *core.RecordCreateEvent) error {
		projectId := e.Record.GetString("projectId")
		user, ok := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)

		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		if err := h.taskService.AuthorizeUserForProject(projectId, user.Id); err != nil {
			return apis.NewForbiddenError("Unauthorized", err)
		}

		return nil
	})
}

func (h *TaskImagesHooks) OnRecordViewRequest() {
	h.app.OnRecordViewRequest(collections.TASK_IMAGES).Add(func(e *core.RecordViewEvent) error {
		projectId := e.Record.GetString("projectId")
		user, ok := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)

		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		if err := h.taskService.AuthorizeUserForProject(projectId, user.Id); err != nil {
			return apis.NewForbiddenError("Unauthorized", err)
		}

		return nil
	})
}
