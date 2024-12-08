package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/handler"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/database"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/router"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/shared/util"
)

func main() {
	if err := godotenv.Load("./../../.env"); err != nil {
		panic("Error loading .env file")
	}

	DB_INVOICE_USER := os.Getenv("DB_INVOICE_USER")
	DB_INVOICE_PASSWORD := os.Getenv("DB_INVOICE_PASSWORD")
	DB_INVOICE_DATABASE := os.Getenv("DB_INVOICE_DATABASE")
	INVOICE_DB_HOST := os.Getenv("INVOICE_DB_HOST")
	INVOICE_DB_PORT := os.Getenv("INVOICE_DB_PORT")

	server := gin.Default()
	database := database.NewMySqlDatabase()
	if err := database.Connect(DB_INVOICE_USER, DB_INVOICE_PASSWORD, INVOICE_DB_HOST, INVOICE_DB_PORT, DB_INVOICE_DATABASE); err != nil {
		panic(err)
	}

	invoiceServiceBuild := util.NewInvoiceServiceBuilder()
	invoiceHandler := handler.NewInvoiceHandler(invoiceServiceBuild, database)

	router.InitRouter(server, invoiceHandler)

	server.Run()
}
