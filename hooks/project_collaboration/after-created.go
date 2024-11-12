package project_collaboration

import (
	"net/http"
	"pocketbase-be/collections"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

func OnAfterCreated(app *pocketbase.PocketBase) {
	app.OnRecordAfterCreateRequest(collections.PROJECT_COLLABORATION).Add(func(e *core.RecordCreateEvent) error {
		fromUser, ok := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return nil
		}

		collection, err := app.Dao().FindCollectionByNameOrId(collections.NOTIFICATION)
		if err != nil {
			return apis.NewBadRequestError("Failed to find notification collection", err)
		}

		record := models.NewRecord(collection)
		record.Set("fromUserId", fromUser.Id)
		record.Set("userId", e.Record.Get("userId"))
		record.Set("projectId", e.Record.Get("projectId"))
		record.Set("message", "You have been invited to a project")
		record.Set("seen", nil)
		record.Set("projectCollaborationId", e.Record.Id)
		record.Set("type", "INVITE_TO_PROJECT")

		form := forms.NewRecordUpsert(app, record)

		event := new(core.RecordCreateEvent)
		event.HttpContext = e.HttpContext
		event.Collection = collection
		event.Record = record

		return form.Submit(func(next forms.InterceptorNextFunc[*models.Record]) forms.InterceptorNextFunc[*models.Record] {
			return func(m *models.Record) error {
				event.Record = m

				return app.OnRecordBeforeCreateRequest().Trigger(event, func(e *core.RecordCreateEvent) error {
					if err := next(e.Record); err != nil {
						return apis.NewBadRequestError("Failed to create record.", err)
					}

					return app.OnRecordAfterCreateRequest().Trigger(event, func(e *core.RecordCreateEvent) error {
						if e.HttpContext.Response().Committed {
							return nil
						}

						return e.HttpContext.JSON(http.StatusOK, e.Record)
					})
				})
			}
		})
	})
}
