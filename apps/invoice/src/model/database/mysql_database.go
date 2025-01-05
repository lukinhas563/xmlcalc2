package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/repository"
)

type MysqlDatabase interface {
	Connect(user, password, host, port, database string) error
	InsertInvoice(invoice entities.Invoice, file string) error
	GetAllInvoices(pageSize int, page int) ([]*entities.Invoice, int, error)
	GetInvoiceById(invoiceId int) (*entities.Invoice, error)
	DeleteInvoiceById(invoiceId int) error
}

type mysqlDatabase struct {
	repository repository.InvoiceRepository
}

func (data *mysqlDatabase) Connect(user, password, host, port, database string) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, database)
	var db *sql.DB
	var err error

	for i := 0; i < 10; i++ {
		db, err = sql.Open("mysql", dsn)

		if err == nil {
			if pingErr := db.Ping(); pingErr == nil {
				data.repository = repository.NewInvoiceRepository(db)
				return nil
			}
		}

		time.Sleep(2 * time.Second)
	}

	return fmt.Errorf("failed to connect to Database after 10 attempts: %w", err)
}

func (data *mysqlDatabase) InsertInvoice(invoice entities.Invoice, file string) error {
	invoideId, err := data.repository.InsertInvoice(invoice)
	if err != nil {
		return err
	}

	data.repository.InsertXML(time.Now().String(), file, invoideId)

	return nil
}

func (data *mysqlDatabase) GetAllInvoices(pageSize int, page int) ([]*entities.Invoice, int, error) {
	invoices, maxPages, err := data.repository.GetAllInvoices(pageSize, page)
	if err != nil {
		return nil, 0, err
	}

	return invoices, maxPages, nil
}

func (data *mysqlDatabase) GetInvoiceById(invoiceId int) (*entities.Invoice, error) {
	invoice, err := data.repository.GetInvoiceById(invoiceId)
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (data *mysqlDatabase) DeleteInvoiceById(invoiceId int) error {
	if err := data.repository.DeleteInvoiceById(invoiceId); err != nil {
		return err
	}

	return nil
}

func NewMySqlDatabase() MysqlDatabase {
	return &mysqlDatabase{}
}
