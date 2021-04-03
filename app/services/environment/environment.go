package environment

import (
	"os"
)

func Get() map[string]string {
	keys := []string{"STRAVA_CLIENT_ID"}

	environment := make(map[string]string, len(keys))

	for _, key := range keys {
		environment[key] = os.Getenv(key)
	}

	return environment
}
