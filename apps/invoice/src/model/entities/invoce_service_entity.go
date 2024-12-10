package entities

import "time"

type Invoice struct {
	Id        int
	Info      Info
	Issuer    Person
	Recipient Person
	Service   Service
	Total     float64
}

type Info struct {
	Key        string
	Number     int
	Competence time.Time
	DateIssue  time.Time
	Series     int
}

type Person struct {
	Name     string
	Identity string
	Address  Address
	City     string
}

type Address struct {
	Street       string
	Number       string
	Neighborhood string
	Complement   string
}

type Service struct {
	Code               string
	CodeDescription    string
	ServiceDescription string
	LocationProvision  string
}
