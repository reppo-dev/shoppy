package utils

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

const SecretKey = "secret"

func GenerateJwt(userId uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.StandardClaims{
		Issuer: strconv.Itoa(int(userId)),
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
	})

	return token.SignedString([]byte(SecretKey))
}