package custom_apis

import (
	"net/http"
	"pocketbase-be/collections"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type NotificationApi struct {
	app   *pocketbase.PocketBase
	event *core.ServeEvent
}

func NewNotificationApi(app *pocketbase.PocketBase, event *core.ServeEvent) *NotificationApi {
	return &NotificationApi{app, event}
}

func (api *NotificationApi) Register() {
	notificationGroup := api.event.Router.Group("/notifications", apis.RequireRecordAuth())
	api.countUnseenNotification(notificationGroup)
}

func (api *NotificationApi) countUnseenNotification(notificationGroup *echo.Group) {
	notificationGroup.GET("/count-unseen", func(c echo.Context) error {
		user, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok {
			return apis.NewUnauthorizedError("Unauthorized", nil)
		}

		records, err := api.app.Dao().FindRecordsByFilter(collections.NOTIFICATION, "userId = {:userId} && seen = {:seen}", "-created", 0, 0, dbx.Params{"userId": user.Id, "seen": nil})
		if err != nil {
			return apis.NewBadRequestError("Failed to count unseen notifications", err)
		}

		return c.JSON(http.StatusOK, len(records))
	})
}
