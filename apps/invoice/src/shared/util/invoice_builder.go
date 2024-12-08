package util

import (
	"time"

	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
)

type InvoiceServiceBuilder interface {
	SetInfo(key string, number int, competence, dateIssue time.Time, series int) *invoiceBuilder
	SetIssuer(name, identity, city, street, number, neighborhood, complement string) *invoiceBuilder
	SetRecipient(name, identity, city, street, number, neighborhood, complement string) *invoiceBuilder
	SetService(serviceCode, codeDescription, serviceDescription, localProvision string) *invoiceBuilder
	SetTotal(total float64) *invoiceBuilder
	Build() *entities.Invoice
}
type invoiceBuilder struct {
	invoice entities.Invoice
}

func NewInvoiceServiceBuilder() InvoiceServiceBuilder {
	return &invoiceBuilder{}
}

func (builder *invoiceBuilder) SetInfo(key string, number int, competence, dateIssue time.Time, series int) *invoiceBuilder {
	info := entities.Info{
		Key:        key,
		Number:     number,
		Competence: competence,
		DateIssue:  dateIssue,
		Series:     series,
	}
	builder.invoice.Info = info
	return builder
}

func (builder *invoiceBuilder) SetIssuer(name, identity, city, street, number, neighborhood, complement string) *invoiceBuilder {
	issuer := entities.Person{
		Name:     name,
		Identity: identity,
		Address: entities.Address{
			Street:       street,
			Number:       number,
			Neighborhood: neighborhood,
			Complement:   complement,
		},
		City: city,
	}
	builder.invoice.Issuer = issuer
	return builder
}

func (builder *invoiceBuilder) SetRecipient(name, identity, city, street, number, neighborhood, complement string) *invoiceBuilder {
	recipient := entities.Person{
		Name:     name,
		Identity: identity,
		Address: entities.Address{
			Street:       street,
			Number:       number,
			Neighborhood: neighborhood,
			Complement:   complement,
		},
		City: city,
	}
	builder.invoice.Recipient = recipient
	return builder
}

func (builder *invoiceBuilder) SetService(serviceCode, codeDescription, serviceDescription, localProvision string) *invoiceBuilder {
	service := entities.Service{
		Code:               serviceCode,
		CodeDescription:    codeDescription,
		ServiceDescription: serviceDescription,
		LocationProvision:  localProvision,
	}
	builder.invoice.Service = service
	return builder
}

func (builder *invoiceBuilder) SetTotal(total float64) *invoiceBuilder {
	builder.invoice.Total = total
	return builder
}

func (builder *invoiceBuilder) Build() *entities.Invoice {
	return &builder.invoice
}
