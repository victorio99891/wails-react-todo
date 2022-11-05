package backend

import (
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"log"
)

type TaskController struct {
	ctx *context.Context
}

func NewTaskController(appCtx *context.Context) *TaskController {
	return &TaskController{
		ctx: appCtx,
	}
}

type Task struct {
	Id     string
	Text   string
	IsDone bool
}

var todos = map[string]*Task{
	"fd99ccf4-9fe0-41fc-9e91-e28b87cbcf1b": {
		Id:     "fd99ccf4-9fe0-41fc-9e91-e28b87cbcf1b",
		Text:   "Buy bread!",
		IsDone: false,
	},
	"464fde1d-7571-4181-94ae-6a2fd24a5fc3": {
		Id:     "464fde1d-7571-4181-94ae-6a2fd24a5fc3",
		Text:   "Learn React!",
		IsDone: false,
	},
}

func (a *TaskController) GetTasks() []*Task {
	list := make([]*Task, 0)
	for _, item := range todos {
		list = append(list, item)
	}
	return list
}

func (a *TaskController) ChangeTaskStatus(id string, status bool) {
	log.Printf("Change status for task: %v to %v", id, status)
	todos[id].IsDone = status
	log.Println("&v", *todos[id])
}

func (a *TaskController) AddTask(task string) string {
	newTaskUuid, err := uuid.NewUUID()
	if err != nil {
		log.Panic("Can't generate new UUID.")
	}

	newTask := &Task{
		Id:     newTaskUuid.String(),
		Text:   task,
		IsDone: false,
	}

	todos[newTaskUuid.String()] = newTask

	return newTaskUuid.String()
}

func (a *TaskController) RemoveTask(taskId string) error {
	if todos[taskId] == nil {
		msg := fmt.Sprintf("No task with id: %v", taskId)
		log.Println(msg)
		return errors.New(msg)
	}

	delete(todos, taskId)

	return nil
}
