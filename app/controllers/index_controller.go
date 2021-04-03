package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/velll/fix-my-track/app/services/environment"
	"net/http"
)

func Index(c *gin.Context, flash ...string) {
	c.HTML(http.StatusOK, "default.tmpl", gin.H{
		"flash": flash,
		"meta":  environment.Get(),
	})
}

func Root(c *gin.Context) {
	Index(c)
}
