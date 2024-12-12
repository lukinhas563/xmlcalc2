package main

import (
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/domain"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/handler"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/database"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/router"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/shared/util"
)

func main() {
	DB_INVOICE_USER := os.Getenv("DB_INVOICE_USER")
	DB_INVOICE_PASSWORD := os.Getenv("DB_INVOICE_PASSWORD")
	DB_INVOICE_DATABASE := os.Getenv("DB_INVOICE_DATABASE")
	INVOICE_DB_HOST := os.Getenv("INVOICE_DB_HOST")
	INVOICE_DB_PORT := os.Getenv("INVOICE_DB_PORT")

	if len(strings.TrimSpace(DB_INVOICE_USER)) == 0 {
		panic("Enviroment DB_INVOICE_USER not defined")
	}

	if len(strings.TrimSpace(DB_INVOICE_PASSWORD)) == 0 {
		panic("Enviroment DB_INVOICE_PASSWORD not defined")
	}

	if len(strings.TrimSpace(DB_INVOICE_DATABASE)) == 0 {
		panic("Enviroment DB_INVOICE_DATABASE not defined")
	}

	if len(strings.TrimSpace(INVOICE_DB_HOST)) == 0 {
		panic("Enviroment INVOICE_DB_HOST not defined")
	}

	if len(strings.TrimSpace(INVOICE_DB_PORT)) == 0 {
		panic("Enviroment INVOICE_DB_PORT not defined")
	}

	// SERVER AND DATABASE
	server := gin.Default()
	database := database.NewMySqlDatabase()
	if err := database.Connect(DB_INVOICE_USER, DB_INVOICE_PASSWORD, INVOICE_DB_HOST, INVOICE_DB_PORT, DB_INVOICE_DATABASE); err != nil {
		panic(err)
	}

	// INVOICE ENDPOINT
	invoiceServiceBuild := util.NewInvoiceServiceBuilder()
	invoiceDomain := domain.NewInvoiceDomain(database, invoiceServiceBuild)
	invoiceHandler := handler.NewInvoiceHandler(invoiceDomain)

	// HEALTH ENDPOINT
	healthHandler := handler.NewHealthHandler()

	// ROUTER
	router.InitRouter(server, invoiceHandler, healthHandler)

	server.Run()
}
