package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
)

type InvoiceRepository interface {
	InsertInfo(info entities.Info) (int64, error)
	InsertAddress(address entities.Address) (int64, error)
	InsertPerson(person entities.Person, addresId int64) (int64, error)
	InsertService(service entities.Service) (int64, error)
	InsertInvoice(invoice entities.Invoice) (int64, error)
	GetAllInvoices(pageSize int, page int) ([]*entities.Invoice, int, error)
	GetInvoiceById(invoiceId int) (*entities.Invoice, error)
	DeleteInvoiceById(invoiceId int) error
	InsertXML(name, xml string, invoiceId int64) (int64, error)
	CountInvoices() (int, error)
}

type invoiceRepository struct {
	database *sql.DB
}

func (repository *invoiceRepository) InsertInfo(info entities.Info) (int64, error) {
	result, err := repository.database.Exec(
		"INSERT INTO invoice_info (invoice_key, number, competence, dateIssue, series) VALUES (?, ?, ?, ?, ?)",
		info.Key,
		info.Number,
		info.Competence,
		info.DateIssue,
		info.Series,
	)

	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func (repository *invoiceRepository) InsertAddress(address entities.Address) (int64, error) {
	result, err := repository.database.Exec(
		"INSERT INTO addresses (street, number, neighborhood, complement) VALUES (?, ?, ?, ?)",
		address.Street,
		address.Number,
		address.Neighborhood,
		address.Complement,
	)

	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func (repository *invoiceRepository) InsertPerson(person entities.Person, addresId int64) (int64, error) {
	result, err := repository.database.Exec(
		"INSERT INTO persons (name, identity, address_id, city) VALUES (?, ?, ?, ?)",
		person.Name,
		person.Identity,
		addresId,
		person.City,
	)

	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func (repository *invoiceRepository) InsertService(service entities.Service) (int64, error) {
	serviceResult, err := repository.database.Exec(
		"INSERT INTO services (code, codeDescription, serviceDescription, locationProvision) VALUES (?, ?, ?, ?)",
		service.Code,
		service.CodeDescription,
		service.ServiceDescription,
		service.LocationProvision,
	)

	if err != nil {
		return 0, err
	}

	return serviceResult.LastInsertId()
}

func (repository *invoiceRepository) InsertXML(name, xml string, invoiceId int64) (int64, error) {
	xmlResult, err := repository.database.Exec(
		"INSERT INTO xmls (name, content, invoice_id) VALUES (?, ?, ?)",
		name,
		xml,
		invoiceId,
	)

	if err != nil {
		return 0, err
	}

	return xmlResult.LastInsertId()
}

func (repository *invoiceRepository) InsertInvoice(invoice entities.Invoice) (int64, error) {

	// INSERT INFO
	infoId, err := repository.InsertInfo(invoice.Info)
	if err != nil {
		return 0, err
	}

	// INSERT ISSUER'S ADDRESS
	issuerAddressId, err := repository.InsertAddress(invoice.Issuer.Address)
	if err != nil {
		return 0, err
	}

	// INSERT ISSUER
	issuerId, err := repository.InsertPerson(invoice.Issuer, issuerAddressId)
	if err != nil {
		return 0, err
	}

	// INSERT RECIPIENT'S ADDRESS
	recipientAddressId, err := repository.InsertAddress(invoice.Recipient.Address)
	if err != nil {
		return 0, err
	}

	// INSERT RECIPIENT
	recipientId, err := repository.InsertPerson(invoice.Recipient, recipientAddressId)
	if err != nil {
		return 0, err
	}

	// INSERT SERVICE
	serviceId, err := repository.InsertService(invoice.Service)
	if err != nil {
		return 0, err
	}

	// INSERT INVOICE
	invoiceResult, err := repository.database.Exec(
		"INSERT INTO invoices (info_id, issuer_id, recipient_id, service_id, total) VALUES (?, ?, ?, ?, ?)",
		infoId,
		issuerId,
		recipientId,
		serviceId,
		invoice.Total,
	)

	if err != nil {
		return 0, err
	}

	return invoiceResult.LastInsertId()
}

func (repository *invoiceRepository) GetAllInvoices(pageSize int, page int) ([]*entities.Invoice, int, error) {
	query := `
		SELECT 
		-- Id da invoice
		invoices.id,
		
		-- Campos do invoice_info
		invoice_info.invoice_key, 
		invoice_info.number, 
		invoice_info.competence, 
		invoice_info.dateIssue, 
		invoice_info.series,
		
		-- Campos do emissor
		persons.name AS issuer_name, 
		persons.identity AS issuer_identity, 
		persons.city AS issuer_city,
		
		-- Campos do endereço do emissor
		addresses.street AS issuer_street, 
		addresses.number AS issuer_number, 
		addresses.neighborhood AS issuer_neighborhood, 
		addresses.complement AS issuer_complement,
		
		-- Campos do destinatário
		recipient.name AS recipient_name, 
		recipient.identity AS recipient_identity, 
		recipient.city AS recipient_city,
		
		-- Campos do endereço do destinatário
		recipient_address.street AS recipient_street, 
		recipient_address.number AS recipient_number, 
		recipient_address.neighborhood AS recipient_neighborhood, 
		recipient_address.complement AS recipient_complement,
		
		-- Campos dos serviços
		services.code, 
		services.codeDescription, 
		services.serviceDescription, 
		services.locationProvision,
		
		-- Total da invoice
		invoices.total
		FROM 
		invoices
		INNER JOIN invoice_info ON invoices.info_id = invoice_info.id
		INNER JOIN persons AS persons ON invoices.issuer_id = persons.id
		INNER JOIN addresses AS addresses ON persons.address_id = addresses.id
		INNER JOIN persons AS recipient ON invoices.recipient_id = recipient.id
		INNER JOIN addresses AS recipient_address ON recipient.address_id = recipient_address.id
		INNER JOIN services ON invoices.service_id = services.id

		-- Paginação
		LIMIT ? OFFSET ?;
	`

	result, err := repository.database.Query(query, pageSize, (page-1)*pageSize)
	if err != nil {
		return nil, 0, err
	}
	defer result.Close()

	invoices := []*entities.Invoice{}

	for result.Next() {
		var id int
		var info entities.Info
		var competence string
		var dateIssue string
		var issuer entities.Person
		var recipient entities.Person
		var issuerAddress entities.Address
		var recipientAddress entities.Address
		var service entities.Service
		var total float64

		if err := result.Scan(
			&id, &info.Key, &info.Number, &competence, &dateIssue, &info.Series,
			&issuer.Name, &issuer.Identity, &issuer.City, &issuerAddress.Street, &issuerAddress.Number, &issuerAddress.Neighborhood, &issuerAddress.Complement,
			&recipient.Name, &recipient.Identity, &recipient.City, &recipientAddress.Street, &recipientAddress.Number, &recipientAddress.Neighborhood, &recipientAddress.Complement,
			&service.Code, &service.CodeDescription, &service.ServiceDescription, &service.LocationProvision,
			&total,
		); err != nil {
			return nil, 0, err
		}

		parsedCompetence, err := parseDate(competence)
		if err != nil {
			fmt.Println("Erro ao converter a data:", err)
			return nil, 0, err
		}
		info.Competence = parsedCompetence

		parsedDateIssue, err := parseDate(dateIssue)
		if err != nil {
			fmt.Println("Erro ao converter a data:", err)
			return nil, 0, err
		}
		info.DateIssue = parsedDateIssue

		issuer.Address = issuerAddress
		recipient.Address = recipientAddress

		invoice := &entities.Invoice{
			Id:        id,
			Info:      info,
			Issuer:    issuer,
			Recipient: recipient,
			Service:   service,
			Total:     total,
		}

		invoices = append(invoices, invoice)
	}

	totalRecord, err := repository.CountInvoices()
	if err != nil {
		return nil, 0, err
	}

	maxPages := (totalRecord + pageSize - 1) / pageSize

	return invoices, maxPages, nil
}

func (repository *invoiceRepository) GetInvoiceById(invoiceId int) (*entities.Invoice, error) {
	query := `
		SELECT 
		-- Id da invoice
		invoices.id,
		
		-- Campos do invoice_info
		invoice_info.invoice_key, 
		invoice_info.number, 
		invoice_info.competence, 
		invoice_info.dateIssue, 
		invoice_info.series,
		
		-- Campos do emissor
		persons.name AS issuer_name, 
		persons.identity AS issuer_identity, 
		persons.city AS issuer_city,
		
		-- Campos do endereço do emissor
		addresses.street AS issuer_street, 
		addresses.number AS issuer_number, 
		addresses.neighborhood AS issuer_neighborhood, 
		addresses.complement AS issuer_complement,
		
		-- Campos do destinatário
		recipient.name AS recipient_name, 
		recipient.identity AS recipient_identity, 
		recipient.city AS recipient_city,
		
		-- Campos do endereço do destinatário
		recipient_address.street AS recipient_street, 
		recipient_address.number AS recipient_number, 
		recipient_address.neighborhood AS recipient_neighborhood, 
		recipient_address.complement AS recipient_complement,
		
		-- Campos dos serviços
		services.code, 
		services.codeDescription, 
		services.serviceDescription, 
		services.locationProvision,
		
		-- Total da invoice
		invoices.total
		FROM 
		invoices
		INNER JOIN invoice_info ON invoices.info_id = invoice_info.id
		INNER JOIN persons AS persons ON invoices.issuer_id = persons.id
		INNER JOIN addresses AS addresses ON persons.address_id = addresses.id
		INNER JOIN persons AS recipient ON invoices.recipient_id = recipient.id
		INNER JOIN addresses AS recipient_address ON recipient.address_id = recipient_address.id
		INNER JOIN services ON invoices.service_id = services.id
		WHERE invoices.id = ?;
	`

	row := repository.database.QueryRow(query, invoiceId)

	var id int
	var info entities.Info
	var competence string
	var dateIssue string
	var issuer entities.Person
	var recipient entities.Person
	var issuerAddress entities.Address
	var recipientAddress entities.Address
	var service entities.Service
	var total float64

	err := row.Scan(
		&id, &info.Key, &info.Number, &competence, &dateIssue, &info.Series,
		&issuer.Name, &issuer.Identity, &issuer.City, &issuerAddress.Street, &issuerAddress.Number, &issuerAddress.Neighborhood, &issuerAddress.Complement,
		&recipient.Name, &recipient.Identity, &recipient.City, &recipientAddress.Street, &recipientAddress.Number, &recipientAddress.Neighborhood, &recipientAddress.Complement,
		&service.Code, &service.CodeDescription, &service.ServiceDescription, &service.LocationProvision,
		&total,
	)

	if err != nil {
		return nil, err
	}

	parsedCompetence, err := parseDate(competence)
	if err != nil {
		return nil, fmt.Errorf("error parsing competence date: %v", err)
	}
	info.Competence = parsedCompetence

	parsedDateIssue, err := parseDate(dateIssue)
	if err != nil {
		return nil, fmt.Errorf("error parsing issue date: %v", err)
	}
	info.DateIssue = parsedDateIssue

	issuer.Address = issuerAddress
	recipient.Address = recipientAddress

	invoice := &entities.Invoice{
		Id:        id,
		Info:      info,
		Issuer:    issuer,
		Recipient: recipient,
		Service:   service,
		Total:     total,
	}

	return invoice, nil
}

func (repository *invoiceRepository) DeleteInvoiceById(invoiceId int) error {
	query := "DELETE FROM invoices WHERE id = ?"

	_, err := repository.database.Exec(query, invoiceId)
	if err != nil {
		return err
	}

	return nil
}

func (repository *invoiceRepository) CountInvoices() (int, error) {
	query := `
		SELECT COUNT(*) 
		FROM 
		invoices
		INNER JOIN invoice_info ON invoices.info_id = invoice_info.id
		INNER JOIN persons AS persons ON invoices.issuer_id = persons.id
		INNER JOIN addresses AS addresses ON persons.address_id = addresses.id
		INNER JOIN persons AS recipient ON invoices.recipient_id = recipient.id
		INNER JOIN addresses AS recipient_address ON recipient.address_id = recipient_address.id
		INNER JOIN services ON invoices.service_id = services.id
	`

	var total int
	err := repository.database.QueryRow(query).Scan(&total)
	if err != nil {
		return 0, err
	}

	return total, nil
}

func NewInvoiceRepository(database *sql.DB) InvoiceRepository {
	return &invoiceRepository{
		database: database,
	}
}

func parseDate(dateStr string) (time.Time, error) {
	if len(dateStr) == len("2006-01-02") {
		// Apenas data (YYYY-MM-DD)
		return time.Parse("2006-01-02", dateStr)
	} else if len(dateStr) == len("2006-01-02 15:04:05") {
		// Data e hora completas (YYYY-MM-DD HH:mm:ss)
		return time.Parse("2006-01-02 15:04:05", dateStr)
	}
	// Caso o formato não seja compatível
	return time.Time{}, fmt.Errorf("formato de data inválido: %s", dateStr)
}
