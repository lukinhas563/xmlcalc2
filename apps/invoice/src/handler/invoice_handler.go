package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/domain"
)

type IInvoiceHandler interface {
	GetServiceInvoices(ctx *gin.Context)
	GetServiceInvoicesById(ctx *gin.Context)
	CreateServiceInvoice(ctx *gin.Context)
	DeleteServiceInvoice(ctx *gin.Context)
	UpdateServiceInvoice(ctx *gin.Context)
}

type invoiceHandler struct {
	domain domain.InvoiceDomain
}

func (handler *invoiceHandler) GetServiceInvoices(ctx *gin.Context) {
	invoices, err := handler.domain.GetAllServiceInvoices()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"hello": "erro to get all invoices",
		})
		return
	}

	ctx.JSON(http.StatusOK, invoices)
}

func (handler *invoiceHandler) GetServiceInvoicesById(ctx *gin.Context) {
	stringId := ctx.Params.ByName("id")
	id, err := strconv.Atoi(stringId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "Nan",
		})
		return
	}

	invoice, err := handler.domain.GetServiceInvoiceById(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	ctx.JSON(http.StatusOK, invoice)
}

func (handler *invoiceHandler) CreateServiceInvoice(ctx *gin.Context) {
	file, err := ctx.FormFile("invoice")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "File error 1",
		})
		return
	}

	invoice, err := handler.domain.CreateServiceInvoice(file)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "File error 2",
		})
		return
	}

	ctx.JSON(http.StatusOK, invoice)
}

func (*invoiceHandler) DeleteServiceInvoice(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"hello": "delete",
	})
}

func (*invoiceHandler) UpdateServiceInvoice(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"hello": "update",
	})
}

func NewInvoiceHandler(domain domain.InvoiceDomain) IInvoiceHandler {
	return &invoiceHandler{
		domain: domain,
	}
}
