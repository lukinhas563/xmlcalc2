package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
)

type MysqlDatabase interface {
	Connect(user, password, host, port, database string) error
	InsertInvoice(invoice entities.Invoice) error
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

func NewMySqlDatabase() MysqlDatabase {
	return &mysqlDatabase{}
}
