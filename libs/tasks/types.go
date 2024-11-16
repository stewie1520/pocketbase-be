package tasks

// TaskDefinition represents the task
type TaskDefinition struct {
	ID          string           `json:"id"`
	Title       string           `json:"title"`
	Description string           `json:"description"`
	Status      string           `json:"status"`
	ProjectID   string           `json:"projectId"`
	User        *UserDefinition  `json:"user"`
	Assignees   []UserDefinition `json:"assignees"`
	Created     string           `json:"created"`
	Updated     string           `json:"updated"`
	Order       float64          `json:"order"`
}

// UserDefinition represents user involved in the task, it could be the creator or assignee
type UserDefinition struct {
	ID     string `db:"id"`
	Email  string `db:"email"`
	Name   string `db:"name"`
	Avatar string `db:"avatar"`
}

type CreateTaskDefinition struct {
	ProjectID   string
	Title       string
	UserID      string
	Description string
	AssigneeIds []string
	Status      string
}
