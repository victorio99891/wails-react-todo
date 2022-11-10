package model

import "time"

type LogisticTask struct {
	Id                      string     `json:"uuid"`
	Status                  string     `json:"status"`
	ForwarderAdviceNoteDate *time.Time `json:"forwarderAdviceNoteDate"`
	VINNumber               string     `json:"vinNumber"`
	ProductionNumberKnr     string     `json:"productionNumberKnr"`
	DispositionType         string     `json:"dispositionType"`
	ShippingClass           string     `json:"shippingClass"`
	Weight                  string     `json:"weight"`
	FieldKey                string     `json:"fieldKey"`
	Destination             string     `json:"destination"`
	DestinationStage        string     `json:"destinationStage"`
	Model                   string     `json:"model"`
	MRNNumber               string     `json:"mrnNumber"`
	ForwarderId             string     `json:"forwarderId"`
	ForwarderName           string     `json:"forwarderName"`
	DistributorName         string     `json:"distributorName"`
	DistributorStreet       string     `json:"distributorStreet"`
	DistributorPostalCode   string     `json:"distributorPostalCode"`
	DistributorCity         string     `json:"distributorCity"`
	ExtraDescription        string     `json:"extraDescription"`
}
