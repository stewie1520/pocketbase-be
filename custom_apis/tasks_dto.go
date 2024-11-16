package custom_apis

import "pocketbase-be/libs/tasks"

// TaskDto represents the task response
type TaskDto struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	ProjectID   string    `json:"projectId"`
	User        *UserDto  `json:"user"`
	Assignees   []UserDto `json:"assignees"`
	Created     string    `json:"created"`
	Updated     string    `json:"updated"`
	Order       float64   `json:"order" default:"1"`
}

func mapTasksToDto(tasks []tasks.TaskDefinition) []TaskDto {
	taskDtos := make([]TaskDto, 0, len(tasks))
	for _, task := range tasks {
		taskDtos = append(taskDtos, mapTaskToDto(&task))
	}

	return taskDtos
}

func mapTaskToDto(task *tasks.TaskDefinition) TaskDto {
	return TaskDto{
		ID:          task.ID,
		Title:       task.Title,
		Description: task.Description,
		Status:      task.Status,
		ProjectID:   task.ProjectID,
		User: &UserDto{
			ID:     task.User.ID,
			Email:  task.User.Email,
			Name:   task.User.Name,
			Avatar: task.User.Avatar,
		},
		Assignees: mapUsersToDto(task.Assignees),
		Created:   task.Created,
		Updated:   task.Updated,
		Order:     task.Order,
	}
}

// UserDto represents user involved in the task, it could be the creator or assignee
type UserDto struct {
	ID     string `json:"id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
}

func mapUsersToDto(users []tasks.UserDefinition) []UserDto {
	userDtos := make([]UserDto, 0, len(users))
	for _, user := range users {
		userDtos = append(userDtos, UserDto{
			ID:     user.ID,
			Email:  user.Email,
			Name:   user.Name,
			Avatar: user.Avatar,
		})
	}
	return userDtos
}
