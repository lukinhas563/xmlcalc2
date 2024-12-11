package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthHandler interface {
	GetHealth(ctx *gin.Context)
}

type healthHandler struct{}

func (*healthHandler) GetHealth(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"status": "Running",
	})
}

func NewHealthHandler() HealthHandler {
	return &healthHandler{}
}
