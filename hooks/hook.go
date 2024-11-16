package hooks

import (
	"pocketbase-be/hooks/project_collaboration"
	"pocketbase-be/hooks/projects"
	"pocketbase-be/hooks/task_images"
	"pocketbase-be/hooks/tasks"
	"pocketbase-be/hooks/view_project_collaboration_expanded_user"
	tasks_lib "pocketbase-be/libs/tasks"

	"github.com/pocketbase/pocketbase"
)

func Register(app *pocketbase.PocketBase, taskService *tasks_lib.TaskService) {
	view_project_collaboration_expanded_user.NewViewProjectCollaborationExpandedUserHooks(app).Register()
	projects.NewProjectHooks(app).Register()
	project_collaboration.NewProjectCollaborationHooks(app).Register()
	tasks.NewTasksHooks(app).Register()

	task_images.NewTaskImagesHooks(app, taskService).Register()
}
