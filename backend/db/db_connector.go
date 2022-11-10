package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"regexp"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const (
	sqlCreateTasksTable = `CREATE TABLE tasks (
    	id int primary key 
	)`
)

type DatabaseClient struct {
	Client *sql.DB
}

func NewDatabaseClient(appCtx *context.Context, databaseFilePath string) *DatabaseClient {
	result, err := regexp.MatchString("[a-zA-Z0-9]+.db", databaseFilePath)
	if err != nil || result == false {
		runtime.MessageDialog(*appCtx, runtime.MessageDialogOptions{
			Message: fmt.Sprintf("Database file should match pattern [a-zA-Z0-9]+.db. Current path is: '%v'", databaseFilePath),
		})
		os.Exit(1)
	}

	db, err := sql.Open("sqlite3", databaseFilePath)
	if err != nil {
		runtime.MessageDialog(*appCtx, runtime.MessageDialogOptions{
			Message: "Cannot connect to database: " + databaseFilePath,
		})
		os.Exit(1)
	}

	rows, err := db.Query("select sqlite_version()")

	var version string
	for rows.Next() {
		err = rows.Scan(&version)
		runtime.LogInfo(*appCtx, "SQLite version: "+version)
	}

	return &DatabaseClient{
		Client: db,
	}
}

func (dbc *DatabaseClient) CreateTasksTable() {
	dbc.createTable("tasks", sqlCreateTasksTable)
}

func (dbc *DatabaseClient) createTable(name string, sql string) {
	query, err := dbc.Client.Prepare(sql)
	checkError(err)
	_, err = query.Exec()
	checkError(err)
	log.Printf("Initialized table '%v'.", name)
}

func checkError(err error) {
	if err != nil {
		log.Println(err)
		return
	}
}
