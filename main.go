package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	routes := gin.Default()

	routes.LoadHTMLGlob("app/layouts/*")

	routes.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "default.tmpl", gin.H{
			"title": "Fix my track",
		})
	})

	routes.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
