package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/velll/fix-my-track/app/services/strava"
)

func ExchangeStravaToken(c *gin.Context) {
	codes, exists := c.Request.URL.Query()["code"]

	if !exists {
		Index(c, "Cannot authorize in strava. Code should not be empty")
		return
	}

	code := codes[0]
	token, err := strava.Exchange(code)

	if err != nil {
		Index(c, "Cannot authorize in strava")
		return
	}

	c.SetCookie("strava-token", token.AccessToken, 60*60*24, "/", "localhost", true, false)
	Index(c)
}
