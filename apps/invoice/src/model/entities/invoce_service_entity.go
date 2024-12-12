package entities

import "time"

type Invoice struct {
	Id        int     `json:"id"`
	Info      Info    `json:"info"`
	Issuer    Person  `json:"issuer"`
	Recipient Person  `json:"recipient"`
	Service   Service `json:"service"`
	Total     float64 `json:"total"`
}

type Info struct {
	Key        string    `json:"key"`
	Number     int       `json:"number"`
	Competence time.Time `json:"competence"`
	DateIssue  time.Time `json:"dateIssue"`
	Series     int       `json:"series"`
}

type Person struct {
	Name     string  `json:"name"`
	Identity string  `json:"identity"`
	Address  Address `json:"address"`
	City     string  `json:"city"`
}

type Address struct {
	Street       string `json:"street"`
	Number       string `json:"number"`
	Neighborhood string `json:"neighborhood"`
	Complement   string `json:"complement"`
}

type Service struct {
	Code               string `json:"code"`
	CodeDescription    string `json:"codeDescription"`
	ServiceDescription string `json:"serviceDescription"`
	LocationProvision  string `json:"locationProvision"`
}
