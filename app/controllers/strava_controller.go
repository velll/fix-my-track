package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/velll/fix-my-track/app/services/strava"
	"log"
)

func ExchangeStravaToken(c *gin.Context) {
	codes, exists := c.Request.URL.Query()["code"]

	if !exists {
		log.Println("Cannot authorize in strava: empty code received")

		Index(c, "Cannot authorize in strava. Code should not be empty")
		return
	}

	code := codes[0]
	token, err := strava.Exchange(code)

	if err != nil {
		log.Println("Cannot authorize in strava. ", err)

		Index(c, "Cannot authorize in strava")
		return
	}

	c.SetCookie("strava-token", token.AccessToken, 60*60*24, "/", "localhost", true, false)
	Index(c)
}
