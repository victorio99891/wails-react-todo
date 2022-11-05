package main

import (
	"embed"
	"go-wails-react/backend"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	taskController := backend.NewTaskController(&app.ctx)
	fileController := backend.NewFileController(&app.ctx)

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "go-wails-react",
		Width:            1280,
		Height:           1024,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			taskController,
			fileController,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
