package domain

import (
	"encoding/xml"
	"io"
	"mime/multipart"

	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/database"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/shared/util"
)

type InvoiceDomain interface {
	GetAllServiceInvoices() ([]*entities.Invoice, error)
	GetServiceInvoiceById(invoiceId int) (*entities.Invoice, error)
	CreateServiceInvoice(file *multipart.FileHeader) (*entities.Invoice, error)
	DeleteServiceInvoiceById(invoiceId int) error
}

type invoiceDomain struct {
	database              database.MysqlDatabase
	invoiceServiceBuilder util.InvoiceServiceBuilder
}

func (domain *invoiceDomain) GetAllServiceInvoices() ([]*entities.Invoice, error) {
	invoices, err := domain.database.GetAllInvoices()
	if err != nil {
		return nil, err
	}

	return invoices, nil
}

func (domain *invoiceDomain) GetServiceInvoiceById(invoiceId int) (*entities.Invoice, error) {
	invoice, err := domain.database.GetInvoiceById(invoiceId)
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (domain *invoiceDomain) CreateServiceInvoice(file *multipart.FileHeader) (*entities.Invoice, error) {
	content, err := file.Open()
	if err != nil {
		return nil, err
	}
	defer content.Close()

	fileBytes, err := io.ReadAll(content)
	if err != nil {
		return nil, err
	}

	var nfse entities.NFSe
	if err := xml.Unmarshal(fileBytes, &nfse); err != nil {
		return nil, err
	}

	domain.invoiceServiceBuilder.
		SetInfo(nfse.InfNFSe.ID, nfse.InfNFSe.NNFSe, nfse.InfNFSe.DhProc, nfse.InfNFSe.DPS.InfDPS.DhEmi, nfse.InfNFSe.DPS.InfDPS.Serie).
		SetIssuer(nfse.InfNFSe.Emit.XNome, nfse.InfNFSe.Emit.Identity, nfse.InfNFSe.CLocIncid, nfse.InfNFSe.Emit.EnderNac.XLgr, nfse.InfNFSe.Emit.EnderNac.Nro, nfse.InfNFSe.Emit.EnderNac.XBairro, "").
		SetRecipient(nfse.InfNFSe.DPS.InfDPS.Toma.XNome, nfse.InfNFSe.DPS.InfDPS.Toma.Identity, "", nfse.InfNFSe.DPS.InfDPS.Toma.End.XLgr, nfse.InfNFSe.DPS.InfDPS.Toma.End.Nro, nfse.InfNFSe.DPS.InfDPS.Toma.End.XBairro, nfse.InfNFSe.DPS.InfDPS.Toma.End.XCpl).
		SetService(nfse.InfNFSe.DPS.InfDPS.Serv.CServ.CTribNac, nfse.InfNFSe.XTribNac, nfse.InfNFSe.DPS.InfDPS.Serv.CServ.XDescServ, nfse.InfNFSe.XLocPrestacao).
		SetTotal(nfse.InfNFSe.DPS.InfDPS.Valores.VServPrest.VServ)

	invoice := domain.invoiceServiceBuilder.Build()

	if err := domain.database.InsertInvoice(*invoice, string(fileBytes)); err != nil {
		return nil, err
	}

	return invoice, nil
}

func (domain *invoiceDomain) DeleteServiceInvoiceById(invoiceId int) error {
	if err := domain.database.DeleteInvoiceById(invoiceId); err != nil {
		return err
	}

	return nil
}

func NewInvoiceDomain(database database.MysqlDatabase, invoiceServiceBuilder util.InvoiceServiceBuilder) InvoiceDomain {
	return &invoiceDomain{
		database:              database,
		invoiceServiceBuilder: invoiceServiceBuilder,
	}
}
