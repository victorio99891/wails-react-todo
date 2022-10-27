package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type ToDo struct {
	Id     string
	Text   string
	IsDone bool
}

var todos = map[string]*ToDo{
	"1": &ToDo{
		Id:     "1",
		Text:   "Buy bread!",
		IsDone: false,
	},
}

func (a *App) GetTasks() []*ToDo {
	list := make([]*ToDo, 0)
	for _, item := range todos {
		list = append(list, item)
	}
	return list
}