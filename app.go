package main

import (
	"context"
	"go-wails-react/backend/db"
	"go-wails-react/backend/settings"
)

// App struct
type App struct {
	ctx      context.Context
	settings *settings.AppSettings
	dbClient *db.DatabaseClient
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	// Create base app context
	a.ctx = ctx
	//Create app settings
	a.settings = settings.NewAppSettings()
	// Create an SQLite database
	a.dbClient = db.NewDatabaseClient(&ctx, a.settings.DatabaseFilePath)
	a.dbClient.CreateTasksTable()
}
