package settings

import (
	"encoding/json"
	"log"
	"os"
)

type AppSettings struct {
	DatabaseFilePath string `json:"databaseFilePath"`
}

const (
	defaultDatabaseName = "tasks.db"
)

func NewAppSettings() *AppSettings {
	settings := loadSettings()
	return &settings
}

func loadSettings() AppSettings {
	settings := AppSettings{}
	file, err := os.ReadFile("./settings.json")

	if err != nil {
		defaultSettings := AppSettings{
			DatabaseFilePath: defaultDatabaseName,
		}
		log.Printf("Loaded default application settings (missing settings.json file): %v", defaultSettings)
		return defaultSettings
	}

	json.Unmarshal(file, &settings)

	if settings.DatabaseFilePath == "" {
		settings.DatabaseFilePath = defaultDatabaseName
	}

	log.Printf("Loaded application settings: %v", settings)

	return settings
}
