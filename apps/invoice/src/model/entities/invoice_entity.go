package entities

import (
	"encoding/xml"
	"time"
)

type InvoiceService struct {
	XMLName   xml.Name `xml:"NFSe"`
	Info      Info     `xml:"infNFSe"`
	Issuer    Person   `xml:"emit"`
	Recipient Person   `xml:"toma"`
	Service   Service  `xml:"serv"`
	Total     Total    `xml:"valores"`
}

type Info struct {
	Key          string    `xml:"Id,attr"`
	Number       int       `xml:"nNFSe"`
	Competence   time.Time `xml:"dCompet"`
	DateEmission time.Time `xml:"dhEmi"`
}

type Person struct {
	Name     string  `xml:"xNome"`
	Identify string  `xml:"CNPJ,CPF"`
	Address  Address `xml:"enderNac"`
	Email    string  `xml:"email"`
}

type Address struct {
	Street       string `xml:"xLgr"`
	Number       string `xml:"nro"`
	Neighborhood string `xml:"xBairro"`
	UF           string `xml:"UF"`
	ZipCode      string `xml:"CEP"`
}

type Service struct {
	Code        string `xml:"cTribNac"`
	Description string `xml:"xDescServ"`
}

type Total struct {
	Total float64 `xml:"vServ"`
}
