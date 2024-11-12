package custom_apis

import (
	"database/sql"
	"net/http"
	"pocketbase-be/collections"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type ProjectApi struct {
	app   *pocketbase.PocketBase
	event *core.ServeEvent
}

func NewProjectApi(app *pocketbase.PocketBase, event *core.ServeEvent) *ProjectApi {
	return &ProjectApi{app, event}
}

func (api *ProjectApi) Register() {
	projectGroup := api.event.Router.Group("/projects", apis.RequireRecordAuth())
	api.inviteToEvent(projectGroup)
}

func (api *ProjectApi) inviteToEvent(projectGroup *echo.Group) {
	projectGroup.POST("/invite-to-project", func(c echo.Context) error {
		data := struct {
			Email     string `json:"email"`
			ProjectId string `json:"projectId"`
		}{}

		user, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		if err := c.Bind(&data); err != nil {
			return apis.NewBadRequestError("Failed to read request data", err)
		}

		project, err := api.app.Dao().FindFirstRecordByFilter(collections.PROJECTS, "id = {:id} && ownerId = {:ownerId}", dbx.Params{"id": data.ProjectId, "ownerId": user.Id})
		if err != nil || project == nil {
			return apis.NewForbiddenError("Project not found", err)
		}

		invitee, err := api.app.Dao().FindFirstRecordByFilter(collections.USERS, "email = {:email}", dbx.Params{"email": data.Email})
		if err != nil {
			return apis.NewBadRequestError("Failed to find user", err)
		}

		if invitee == nil {
			return apis.NewBadRequestError("User not found", nil)
		}

		invited, err := api.app.Dao().FindFirstRecordByFilter(collections.PROJECT_COLLABORATION, "projectId = {:projectId} && userId = {:userId}", dbx.Params{"projectId": project.Id, "userId": invitee.Id})
		if err != sql.ErrNoRows && err != nil {
			return apis.NewBadRequestError("Failed to find project collaboration", err)
		}

		if invited != nil {
			return c.JSON(200, struct{ Message string }{Message: "User already invited to project"})
		}

		collection, err := api.app.Dao().FindCollectionByNameOrId(collections.PROJECT_COLLABORATION)
		if err != nil {
			return apis.NewBadRequestError("Failed to find project collaboration collection", err)
		}

		record := models.NewRecord(collection)
		record.Set("projectId", project.Id)
		record.Set("userId", invitee.Id)
		form := forms.NewRecordUpsert(api.app, record)

		event := new(core.RecordCreateEvent)
		event.HttpContext = c
		event.Collection = collection
		event.Record = record

		return form.Submit(func(next forms.InterceptorNextFunc[*models.Record]) forms.InterceptorNextFunc[*models.Record] {
			return func(m *models.Record) error {
				event.Record = m

				return api.app.OnRecordBeforeCreateRequest().Trigger(event, func(e *core.RecordCreateEvent) error {
					if err := next(e.Record); err != nil {
						return apis.NewBadRequestError("Failed to create record.", err)
					}

					return api.app.OnRecordAfterCreateRequest().Trigger(event, func(e *core.RecordCreateEvent) error {
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
