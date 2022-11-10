package xls

import (
	"encoding/json"
	"errors"
	"fmt"
	"go-wails-react/backend/model"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/shakinm/xlsReader/xls"
	"github.com/shakinm/xlsReader/xls/structure"
)

const reportFilePath = "/Users/wkrzyzanowski/Downloads/vehicles_shipper_notification.xls"

func RunReader() {
	log.Println("Loading XLS file...")
	workbook, err := OpenFile(reportFilePath)
	if err != nil {
		return
	}
	workbookSheets := GetWorkbookSheets(workbook)

	list, _ := GetAllSheetRowsData(workbookSheets[0])
	jsonData, _ := json.MarshalIndent(list, "", "    ")
	log.Println(string(jsonData))

	single, err := GetSingleSheetRowsData(workbookSheets[0], 99)
	jsonData, _ = json.MarshalIndent(single, "", "    ")
	log.Println(string(jsonData))
}

func OpenFile(filepath string) (*xls.Workbook, error) {
	f, err := xls.OpenFile(filepath)
	if err != nil {
		log.Printf("%v", err)
		return nil, err
	}
	return &f, nil
}

func GetWorkbookSheets(workbook *xls.Workbook) map[int]*xls.Sheet {
	log.Printf("Loaded %v workbook sheet(s).", len(workbook.GetSheets()))
	log.Println("Loading workbook sheet names...")
	sheets := make(map[int]*xls.Sheet, 0)
	for idx, sheet := range workbook.GetSheets() {
		log.Printf("Loaded sheet: %v", sheet.GetName())
		sheets[idx] = &sheet
	}
	return sheets
}

func GetAllSheetRowsData(sheet *xls.Sheet) ([]*model.LogisticTask, error) {
	firstDataRowIdx := 1 // First contain columns names only®
	log.Printf("Loading %v row(s) data from sheet '%v'", sheet.GetNumberRows()-1, sheet.GetName())
	list := make([]*model.LogisticTask, 0)
	for ridx := firstDataRowIdx; ridx < sheet.GetNumberRows(); ridx++ {
		mapped, err := getVehicleWorkbookRow(sheet, ridx)
		if err != nil {
			return nil, err
		}
		list = append(list, mapped)
	}
	log.Printf("Succesfully loaded %v row(s)", len(list))
	return list, nil
}

func GetSingleSheetRowsData(sheet *xls.Sheet, rIdx int) (*model.LogisticTask, error) {
	log.Printf("Loading single row no. '%v' data from sheet '%v'", rIdx, sheet.GetName())

	cell, err := getCell(sheet, rIdx, 0)
	if err != nil {
		log.Printf("Cannot read row no. %v", rIdx)
		return nil, err
	}

	if cell.GetString() == "" {
		return nil, errors.New(fmt.Sprintf("Row with no. %v is empty.", rIdx))
	}

	mappedRow, err := getVehicleWorkbookRow(sheet, rIdx)
	if err != nil {
		return nil, err
	}

	return mappedRow, nil
}

func getVehicleWorkbookRow(sheet *xls.Sheet, ridx int) (*model.LogisticTask, error) {
	rdmUuid, err := uuid.NewUUID()
	if err != nil {
		log.Println("Can't generate new UUID.")
		return nil, err
	}

	return &model.LogisticTask{
		Id:                      rdmUuid.String(),
		Status:                  getCellStringValue(sheet, ridx, 0),
		ForwarderAdviceNoteDate: parseDate(getCellStringValue(sheet, ridx, 1)),
		VINNumber:               getCellStringValue(sheet, ridx, 2),
		ProductionNumberKnr:     getCellStringValue(sheet, ridx, 3),
		DispositionType:         getCellStringValue(sheet, ridx, 4),
		ShippingClass:           getCellStringValue(sheet, ridx, 5),
		Weight:                  getCellStringValue(sheet, ridx, 6),
		FieldKey:                getCellStringValue(sheet, ridx, 7),
		Destination:             getCellStringValue(sheet, ridx, 8),
		DestinationStage:        getCellStringValue(sheet, ridx, 9),
		Model:                   getCellStringValue(sheet, ridx, 10),
		MRNNumber:               getCellStringValue(sheet, ridx, 11),
		ForwarderId:             getCellStringValue(sheet, ridx, 12),
		ForwarderName:           getCellStringValue(sheet, ridx, 13),
		DistributorName:         getCellStringValue(sheet, ridx, 14),
		DistributorStreet:       getCellStringValue(sheet, ridx, 15),
		DistributorPostalCode:   getCellStringValue(sheet, ridx, 16),
		DistributorCity:         getCellStringValue(sheet, ridx, 17),
		ExtraDescription:        getCellStringValue(sheet, ridx, 18),
	}, nil
}

func parseDate(stringDate string) *time.Time {
	if stringDate == "" {
		return nil
	}
	location, err := time.LoadLocation("Local")
	if err != nil {
		log.Printf("Can't load date location")
	}

	parsedTime, err := time.ParseInLocation("02.01.2006 15:04:05", stringDate, location)
	if err != nil {
		log.Printf("Can't parse string date: %v. Error: %v", stringDate, err)
	}
	return &parsedTime
}

func getCellStringValue(sheet *xls.Sheet, rowIdx int, colIdx int) string {
	col, err := getCell(sheet, rowIdx, colIdx)
	if err != nil {
		log.Println(err)
	}
	return col.GetString()
}

func getCell(sheet *xls.Sheet, rowIdx int, colIdx int) (structure.CellData, error) {
	row, err := sheet.GetRow(rowIdx)
	if err != nil {
		log.Printf("Cannot read row no. %v", rowIdx)
		return nil, err
	}

	col, err := row.GetCol(colIdx)
	if err != nil {
		log.Printf("Cannot read cell with address:  row:%v col: %v", rowIdx, colIdx)
		return nil, err
	}
	return col, nil
}
