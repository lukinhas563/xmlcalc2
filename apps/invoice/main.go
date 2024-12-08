package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/handler"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/router"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/shared/util"
)

func main() {
	server := gin.Default()

	invoiceServiceBuild := util.NewInvoiceServiceBuilder()
	invoiceHandler := handler.NewInvoiceHandler(invoiceServiceBuild)

	router.InitRouter(server, invoiceHandler)

	server.Run()
}
