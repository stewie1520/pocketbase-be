package view_project_collaboration_expanded_user

import (
	"log"
	"pocketbase-be/collections"
	"sync"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type ViewProjectCollaborationExpandedUserHooks struct {
	app *pocketbase.PocketBase
}

func NewViewProjectCollaborationExpandedUserHooks(app *pocketbase.PocketBase) *ViewProjectCollaborationExpandedUserHooks {
	return &ViewProjectCollaborationExpandedUserHooks{app}
}

func (h *ViewProjectCollaborationExpandedUserHooks) Register() {
	h.onRecordsListRequest()
}

func (h *ViewProjectCollaborationExpandedUserHooks) onRecordsListRequest() {
	h.app.OnRecordsListRequest(collections.VIEW_PROJECT_COLLABORATION_EXPANDED_USER).Add(func(e *core.RecordsListEvent) error {
		admin, ok := e.HttpContext.Get(apis.ContextAdminKey).(*models.Record)
		if ok && admin != nil {
			return nil
		}

		user, ok := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return nil
		}

		wg := &sync.WaitGroup{}
		projectIdMap := map[string]bool{}
		valid := true

		for _, record := range e.Records {
			projectId := record.Get("projectId").(string)
			_, ok := projectIdMap[projectId]
			if ok {
				continue
			}

			projectIdMap[projectId] = true
			wg.Add(1)

			go func(projectId string) {
				defer wg.Done()

				records, err := h.app.Dao().FindRecordsByFilter(
					collections.VIEW_PROJECT_COLLABORATION_EXPANDED_USER,
					"projectId = {:projectId} && userId = {:userId}",
					"-id",
					1,
					0,
					dbx.Params{"projectId": projectId, "userId": user.Id},
				)

				if err != nil {
					log.Println("error", err)
					return
				}

				if len(records) == 0 {
					valid = false
				}
			}(projectId)
		}

		wg.Wait()

		if !valid {
			e.Records = []*models.Record{}
			e.Result.Items = []any{}
			e.Result.Page = 1
			e.Result.TotalItems = -1
			e.Result.TotalPages = -1
		}

		return nil
	})

}
