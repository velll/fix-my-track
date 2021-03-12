package app

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/velll/fix-my-track/app/controllers"
)

func Run() {
	fmt.Println("Starting up")

	routes := gin.Default()

	routes.LoadHTMLGlob("app/layouts/*")

	routes.GET("/", controllers.Index)

	routes.Run()
}
