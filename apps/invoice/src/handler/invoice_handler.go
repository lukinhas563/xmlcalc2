package handler

import (
	"encoding/xml"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/model/entities"
	"github.com/lukinhas563/xmlcalc2/app/invoice/src/shared/util"
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

	var nfse entities.NFSe
	decoder := xml.NewDecoder(content)
	if err := decoder.Decode(&nfse); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"err": "File error 3",
		})
		return
	}

	invoiceServiceBuild := util.NewInvoiceServiceBuilder()
	invoiceServiceBuild.
		SetInfo(nfse.InfNFSe.ID, nfse.InfNFSe.NNFSe, nfse.InfNFSe.DhProc, nfse.InfNFSe.DPS.InfDPS.DhEmi, nfse.InfNFSe.DPS.InfDPS.Serie).
		SetIssuer(nfse.InfNFSe.Emit.XNome, nfse.InfNFSe.Emit.Identity, nfse.InfNFSe.CLocIncid, nfse.InfNFSe.Emit.EnderNac.XLgr, nfse.InfNFSe.Emit.EnderNac.Nro, nfse.InfNFSe.Emit.EnderNac.XBairro, "").
		SetRecipient(nfse.InfNFSe.DPS.InfDPS.Toma.XNome, nfse.InfNFSe.DPS.InfDPS.Toma.Identity, "", nfse.InfNFSe.DPS.InfDPS.Toma.End.XLgr, nfse.InfNFSe.DPS.InfDPS.Toma.End.Nro, nfse.InfNFSe.DPS.InfDPS.Toma.End.XBairro, nfse.InfNFSe.DPS.InfDPS.Toma.End.XCpl).
		SetService(nfse.InfNFSe.DPS.InfDPS.Serv.CServ.CTribNac, nfse.InfNFSe.XTribNac, nfse.InfNFSe.DPS.InfDPS.Serv.CServ.XDescServ, nfse.InfNFSe.XLocPrestacao).
		SetTotal(nfse.InfNFSe.DPS.InfDPS.Valores.VServPrest.VServ)

	invoide := invoiceServiceBuild.Build()

	ctx.JSON(http.StatusOK, invoide)
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
