package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index(c *gin.Context) {
	fmt.Println("in application controller")

	c.HTML(http.StatusOK, "default.tmpl", gin.H{
		"title": "Fix my track",
	})
}
