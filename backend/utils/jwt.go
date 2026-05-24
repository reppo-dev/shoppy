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

func ParseJwt(cookie string) (string,error) {
	token,err := jwt.ParseWithClaims(cookie,&jwt.StandardClaims{},func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey),nil
	})
	if err != nil {
		return "",err
	}

	claim := token.Claims.(*jwt.StandardClaims)

	return claim.Issuer,nil
}