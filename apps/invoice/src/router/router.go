package router

import (
	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/handler"
)

func InitRouter(server *gin.Engine, invoiceHandler handler.IInvoiceHandler) {
	server.GET("/invoice/service", invoiceHandler.GetServiceInvoices)
	server.GET("/invoice/service/:id", invoiceHandler.GetServiceInvoicesById)
	server.POST("/invoice/service", invoiceHandler.CreateServiceInvoice)
	server.DELETE("/invoice/service", invoiceHandler.DeleteServiceInvoice)
	server.PUT("/invoice/service", invoiceHandler.UpdateServiceInvoice)
}
