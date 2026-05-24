package controllers

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
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

func GetProduct(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	id,err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var product models.Product

	if err := databases.DB.WithContext(ctx).First(&product,id).Error; err!=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed find product"})
	}

	return c.JSON(product)
}
