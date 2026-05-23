package controllers

import (
	"backend/databases"
	"backend/models"
	"backend/utils"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),5 * time.Second)
	defer cancel()
	var data map[string]string

	if err := c.BodyParser(&data); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

	if data["password"] != data["password_confirm"] {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Password not match",})
	}

	hashPassword ,err := bcrypt.GenerateFromPassword([]byte(data["password"]),14)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Invalid server hash password",
		})
	}

	user := models.User{
		UserName: data["user_name"],
		Email: data["email"],
		Password: string(hashPassword),
	}

	if err := databases.DB.WithContext(ctx).Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Filed create user",})
	}

	token ,err := utils.GenerateJwt(user.ID)

	if err != nil  {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Filed generate token!"})
	}

	cookie := fiber.Cookie{
		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message":"success create user"})
}