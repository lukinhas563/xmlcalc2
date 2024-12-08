package entities

import (
	"encoding/xml"
	"time"
)

// NFSe representa o elemento raiz do XML
type NFSe struct {
	XMLName   xml.Name  `xml:"NFSe"`
	Version   string    `xml:"versao,attr"`
	InfNFSe   infNFSe   `xml:"infNFSe"`
	Signature signature `xml:"Signature"`
}

// InfNFSe contém as informações gerais da nota fiscal
type infNFSe struct {
	ID            string    `xml:"Id,attr"`
	XLocEmi       string    `xml:"xLocEmi"`
	XLocPrestacao string    `xml:"xLocPrestacao"`
	NNFSe         int       `xml:"nNFSe"`
	CLocIncid     string    `xml:"cLocIncid"`
	XLocIncid     string    `xml:"xLocIncid"`
	XTribNac      string    `xml:"xTribNac"`
	VerAplic      string    `xml:"verAplic"`
	AmbGer        string    `xml:"ambGer"`
	TpEmis        string    `xml:"tpEmis"`
	ProcEmi       string    `xml:"procEmi"`
	CStat         string    `xml:"cStat"`
	DhProc        time.Time `xml:"dhProc"`
	NDFSe         string    `xml:"nDFSe"`
	Emit          Emit      `xml:"emit"`
	DPS           dps       `xml:"DPS"`
}

type Emit struct {
	Identity string   `xml:"CNPJ,CPF"`
	XNome    string   `xml:"xNome"`
	EnderNac EnderNac `xml:"enderNac"`
	Fone     string   `xml:"fone"`
	Email    string   `xml:"email"`
}

type EnderNac struct {
	XLgr    string `xml:"xLgr"`
	Nro     string `xml:"nro"`
	XBairro string `xml:"xBairro"`
	CMun    string `xml:"cMun"`
	UF      string `xml:"UF"`
	CEP     string `xml:"CEP"`
}

// DPS contém informações do Documento de Prestação de Serviço
type dps struct {
	InfDPS infDPS `xml:"infDPS"`
}

// InfDPS contém informações detalhadas do DPS
type infDPS struct {
	ID       string     `xml:"Id,attr"`
	TpAmb    string     `xml:"tpAmb"`
	DhEmi    time.Time  `xml:"dhEmi"`
	VerAplic string     `xml:"verAplic"`
	Serie    int        `xml:"serie"`
	NDPS     string     `xml:"nDPS"`
	DCompet  string     `xml:"dCompet"`
	TpEmit   string     `xml:"tpEmit"`
	CLocEmi  string     `xml:"cLocEmi"`
	Prest    prestador  `xml:"prest"`
	Toma     tomador    `xml:"toma"`
	Serv     servico    `xml:"serv"`
	Valores  dpsValores `xml:"valores"`
}

// Prestador representa as informações do prestador do serviço
type prestador struct {
	CNPJ  string `xml:"CNPJ,CPF"`
	Fone  string `xml:"fone"`
	Email string `xml:"email"`
}

// Tomador representa as informações do tomador do serviço
type tomador struct {
	Identity string   `xml:"CNPJ,CPF"`
	XNome    string   `xml:"xNome"`
	End      endereco `xml:"end"`
}

// Endereco representa o endereço do tomador
type endereco struct {
	EndNac  endNac `xml:"endNac"`
	XLgr    string `xml:"xLgr"`
	Nro     string `xml:"nro"`
	XCpl    string `xml:"xCpl"`
	XBairro string `xml:"xBairro"`
}

// EndNac representa os dados nacionais do endereço
type endNac struct {
	CMun string `xml:"cMun"`
	CEP  string `xml:"CEP"`
}

// Servico representa as informações do serviço prestado
type servico struct {
	LocPrest locPrestacao `xml:"locPrest"`
	CServ    cServ        `xml:"cServ"`
}

// LocPrestacao representa o local da prestação de serviço
type locPrestacao struct {
	CLocPrestacao string `xml:"cLocPrestacao"`
}

// CServ representa os detalhes do serviço
type cServ struct {
	CTribNac  string `xml:"cTribNac"`
	XDescServ string `xml:"xDescServ"`
}

// DPSValores representa os valores do DPS
type dpsValores struct {
	VServPrest vServPrest `xml:"vServPrest"`
	Trib       trib       `xml:"trib"`
}

// VServPrest representa os valores do serviço prestado
type vServPrest struct {
	VServ float64 `xml:"vServ"`
}

// Trib representa informações tributárias
type trib struct {
	TribMun tribMun `xml:"tribMun"`
	TotTrib totTrib `xml:"totTrib"`
}

// TribMun representa os tributos municipais
type tribMun struct {
	TribISSQN  string `xml:"tribISSQN"`
	TpRetISSQN string `xml:"tpRetISSQN"`
}

// TotTrib representa o total de tributos
type totTrib struct {
	IndTotTrib string `xml:"indTotTrib"`
}

// Signature representa a assinatura do XML
type signature struct {
	SignedInfo     signedInfo `xml:"SignedInfo"`
	SignatureValue string     `xml:"SignatureValue"`
	KeyInfo        keyInfo    `xml:"KeyInfo"`
}

// SignedInfo representa informações assinadas
type signedInfo struct {
	CanonicalizationMethod algorithmAttribute `xml:"CanonicalizationMethod"`
	SignatureMethod        algorithmAttribute `xml:"SignatureMethod"`
	Reference              reference          `xml:"Reference"`
}

// AlgorithmAttribute representa um atributo de algoritmo
type algorithmAttribute struct {
	Algorithm string `xml:"Algorithm,attr"`
}

// Reference representa a referência de assinatura
type reference struct {
	URI          string             `xml:"URI,attr"`
	Transforms   transforms         `xml:"Transforms"`
	DigestMethod algorithmAttribute `xml:"DigestMethod"`
	DigestValue  string             `xml:"DigestValue"`
}

// Transforms representa as transformações aplicadas na assinatura
type transforms struct {
	Transform []algorithmAttribute `xml:"Transform"`
}

// KeyInfo representa as informações da chave usada na assinatura
type keyInfo struct {
	X509Data x509Data `xml:"X509Data"`
}

// X509Data contém os dados do certificado X509
type x509Data struct {
	X509Certificate string `xml:"X509Certificate"`
}
