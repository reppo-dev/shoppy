package controllers

import (
	"backend/databases"
	"backend/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllProducts(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	var products []models.Product

	if err := databases.DB.WithContext(ctx).Find(&products).Error; err!=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Failed find products",
		})
	}

	return c.JSON(products)
}