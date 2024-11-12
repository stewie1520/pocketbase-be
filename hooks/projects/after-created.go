package projects

import (
	"pocketbase-be/collections"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func OnAfterCreated(app *pocketbase.PocketBase) {
	app.OnRecordAfterCreateRequest(collections.PROJECTS).Add(func(e *core.RecordCreateEvent) error {
		admin, ok := e.HttpContext.Get(apis.ContextAdminKey).(*models.Record)
		if ok && admin != nil {
			return nil
		}

		user, ok := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return nil
		}

		_, err := app.Dao().DB().Insert(collections.PROJECT_COLLABORATION, dbx.Params{
			"projectId": e.Record.Id,
			"userId":    user.Id,
		}).Execute()

		if err != nil {
			return err
		}

		return nil
	})
}
