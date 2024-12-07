package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/handler"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/router"
)

func main() {
	server := gin.Default()

	invoiceHandler := handler.NewInvoiceHandler()
	
	router.InitRouter(server, invoiceHandler)

	server.Run()
}
