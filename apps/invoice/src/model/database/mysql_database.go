package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
)

type MysqlDatabase interface {
	Connect(user, password, host, port, database string) error
	InsertInvoice(invoice entities.Invoice) error
	GetAllInvoices() ([]*entities.Invoice, error)
}

type mysqlDatabase struct {
	database *sql.DB
}

func (d *mysqlDatabase) Connect(user, password, host, port, database string) error {

	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, database))
	if err != nil {
		return err
	}

	if err := db.Ping(); err != nil {
		return err
	}

	d.database = db
	return nil
}

func (d *mysqlDatabase) InsertInvoice(invoice entities.Invoice) error {
	// Inserção da info
	infoResult, err := d.database.Exec(
		"INSERT INTO invoice_info (invoice_key, number, competence, dateIssue, series) VALUES (?, ?, ?, ?, ?)",
		invoice.Info.Key,
		invoice.Info.Number,
		invoice.Info.Competence,
		invoice.Info.DateIssue,
		invoice.Info.Series,
	)
	if err != nil {
		return err
	}
	infoId, _ := infoResult.LastInsertId()

	// Inserção do endereço do emissor
	addressIssuerResult, err := d.database.Exec(
		"INSERT INTO addresses (street, number, neighborhood, complement) VALUES (?, ?, ?, ?)",
		invoice.Issuer.Address.Street,
		invoice.Issuer.Address.Number,
		invoice.Issuer.Address.Neighborhood,
		invoice.Issuer.Address.Complement,
	)
	if err != nil {
		return err
	}
	addressIssuerId, _ := addressIssuerResult.LastInsertId()

	// Inserção do emissor
	issuerResult, err := d.database.Exec(
		"INSERT INTO persons (name, identity, address_id, city) VALUES (?, ?, ?, ?)",
		invoice.Issuer.Name,
		invoice.Issuer.Identity,
		addressIssuerId,
		invoice.Issuer.City,
	)
	if err != nil {
		return err
	}
	issuerId, _ := issuerResult.LastInsertId()

	// Inserção do endereço do receptor
	addressRecipientResult, err := d.database.Exec(
		"INSERT INTO addresses (street, number, neighborhood, complement) VALUES (?, ?, ?, ?)",
		invoice.Recipient.Address.Street,
		invoice.Recipient.Address.Number,
		invoice.Recipient.Address.Neighborhood,
		invoice.Recipient.Address.Complement,
	)
	if err != nil {
		return err
	}
	addressRecipientId, _ := addressRecipientResult.LastInsertId()

	// Inserção do receptor
	recipientResult, err := d.database.Exec(
		"INSERT INTO persons (name, identity, address_id, city) VALUES (?, ?, ?, ?)",
		invoice.Recipient.Name,
		invoice.Recipient.Identity,
		addressRecipientId,
		invoice.Recipient.City,
	)
	if err != nil {
		return err
	}
	recipientId, _ := recipientResult.LastInsertId()

	// Inserção do serviço
	serviceResult, err := d.database.Exec(
		"INSERT INTO services (code, codeDescription, serviceDescription, locationProvision) VALUES (?, ?, ?, ?)",
		invoice.Service.Code,
		invoice.Service.CodeDescription,
		invoice.Service.ServiceDescription,
		invoice.Service.LocationProvision,
	)
	if err != nil {
		return err
	}
	serviceId, _ := serviceResult.LastInsertId()

	// Inserção da fatura
	_, err = d.database.Exec(
		"INSERT INTO invoices (info_id, issuer_id, recipient_id, service_id, total) VALUES (?, ?, ?, ?, ?)",
		infoId,
		issuerId,
		recipientId,
		serviceId,
		invoice.Total,
	)
	if err != nil {
		return err
	}

	return nil
}

func (d *mysqlDatabase) GetAllInvoices() ([]*entities.Invoice, error) {
	query := `
		SELECT 
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
		INNER JOIN services ON invoices.service_id = services.id;
	`

	result, err := d.database.Query(query)
	if err != nil {
		return nil, err
	}
	defer result.Close()

	invoices := []*entities.Invoice{}

	for result.Next() {
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
			&info.Key, &info.Number, &competence, &dateIssue, &info.Series,
			&issuer.Name, &issuer.Identity, &issuer.City, &issuerAddress.Street, &issuerAddress.Number, &issuerAddress.Neighborhood, &issuerAddress.Complement,
			&recipient.Name, &recipient.Identity, &recipient.City, &recipientAddress.Street, &recipientAddress.Number, &recipientAddress.Neighborhood, &recipientAddress.Complement,
			&service.Code, &service.CodeDescription, &service.ServiceDescription, &service.LocationProvision,
			&total,
		); err != nil {
			return nil, err
		}

		parsedCompetence, err := parseDate(competence)
		if err != nil {
			fmt.Println("Erro ao converter a data:", err)
			return nil, err
		}
		info.Competence = parsedCompetence

		parsedDateIssue, err := parseDate(dateIssue)
		if err != nil {
			fmt.Println("Erro ao converter a data:", err)
			return nil, err
		}
		info.DateIssue = parsedDateIssue

		issuer.Address = issuerAddress
		recipient.Address = recipientAddress

		invoice := &entities.Invoice{
			Info:      info,
			Issuer:    issuer,
			Recipient: recipient,
			Service:   service,
			Total:     total,
		}

		invoices = append(invoices, invoice)
	}

	return invoices, nil
}

func NewMySqlDatabase() MysqlDatabase {
	return &mysqlDatabase{}
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
