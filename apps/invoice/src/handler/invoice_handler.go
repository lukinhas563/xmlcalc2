package handler

import (
	"encoding/xml"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
)

type IInvoiceHandler interface {
	GetServiceInvoices(ctx *gin.Context)
	GetServiceInvoicesById(ctx *gin.Context)
	CreateServiceInvoice(ctx *gin.Context)
	DeleteServiceInvoice(ctx *gin.Context)
	UpdateServiceInvoice(ctx *gin.Context)
}

type invoiceHandler struct{}

func (*invoiceHandler) GetServiceInvoices(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"hello": "Get List",
	})
}

func (*invoiceHandler) GetServiceInvoicesById(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"hello": "Get ID",
	})
}

func (*invoiceHandler) CreateServiceInvoice(ctx *gin.Context) {
	file, err := ctx.FormFile("invoice")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "File error 1",
		})
		return
	}

	content, err := file.Open()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "File error 2",
		})
		return
	}
	defer content.Close()

	var invoice entities.InvoiceService
	decoder := xml.NewDecoder(content)
	if err := decoder.Decode(&invoice); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "File error 3",
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

func NewInvoiceHandler() IInvoiceHandler {
	return &invoiceHandler{}
}
