package backend

import (
	"context"
	"errors"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"go-wails-react/backend/xls"
)

type FileController struct {
	ctx *context.Context
}

func NewFileController(appCtx *context.Context) *FileController {
	return &FileController{
		ctx: appCtx,
	}
}

func (f *FileController) SelectFile() string {
	file, err := runtime.OpenFileDialog(*f.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				Pattern: "*.xls",
			},
		},
	})
	if err != nil {
		return err.Error()
	}
	return file
}

func (f *FileController) ShowMessage(msg string) error {
	_, err := runtime.MessageDialog(*f.ctx, runtime.MessageDialogOptions{
		Message: msg,
	})
	if err != nil {
		return err
	}
	return nil
}

func (f *FileController) LoadFileData(filePath string) ([]xls.VehicleWorkbookStructure, error) {

	if filePath == "" {
		return []xls.VehicleWorkbookStructure{}, errors.New("empty file path")
	}

	workbook, err := xls.OpenFile(filePath)
	if err != nil {
		runtime.LogError(*f.ctx, "Cannot load file!")
	}

	sheets := xls.GetWorkbookSheets(workbook)
	data, err := xls.GetAllSheetRowsData(sheets[0])
	if err != nil {
		return nil, err
	}

	result := make([]xls.VehicleWorkbookStructure, 0)
	for _, item := range data {
		result = append(result, *item)
	}

	return result, nil
}
