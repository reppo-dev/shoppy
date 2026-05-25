package utils

import (
	"errors"
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

func ParseJwt(cookie string) (uint,error) {
	token,err := jwt.ParseWithClaims(cookie,&jwt.StandardClaims{},func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey),nil
	})
	if err != nil {
		return 0,err
	}

	claims := token.Claims.(*jwt.StandardClaims)

    userID, err := strconv.ParseUint(claims.Issuer, 10, 32)
    if err != nil {
        return 0, errors.New("invalid user_id in token")
    }

    return uint(userID), nil
}