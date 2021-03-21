package strava

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type ExchangedToken struct {
	AccessToken string `json:"access_token"`
}

func coerceTokenResponse(reponse map[string]interface{}) ExchangedToken {
	return ExchangedToken{AccessToken: reponse["access_token"].(string)}
}

func Exchange(code string) (ExchangedToken, error) {
	url := "https://www.strava.com/api/v3/oauth/token"

	params := map[string]string{
		"client_id":     os.Getenv("STRAVA_CLIENT_ID"),
		"client_secret": os.Getenv("STRAVA_CLIENT_SECRET"),
		"code":          code,
		"grant_type":    "authorization_code",
	}

	var json map[string]interface{}

	json, err := post(url, params)

	if err != nil {
		return ExchangedToken{}, err
	}

	return coerceTokenResponse(json), nil
}

func post(url string, params map[string]string) (map[string]interface{}, error) {
	var result map[string]interface{}
	body, _ := json.Marshal(params)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(body))

	if err != nil {
		return result, err
	}

	if resp.StatusCode != http.StatusOK {
		return result, fmt.Errorf("POST %v responded with %v: ", url, resp.StatusCode)
	}

	defer resp.Body.Close()

	parse_err := json.NewDecoder(resp.Body).Decode(&result)

	if err != nil {
		return result, parse_err
	}

	return result, nil
}
