package custom_apis

type Pagination[T any] struct {
	Items      []T     `json:"items"`
	Page       int64   `json:"page"`
	PerPage    int64   `json:"perPage"`
	TotalItems int64   `json:"totalItems"`
	TotalPages float64 `json:"totalPages"`
}
