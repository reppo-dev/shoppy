package controllers

import (
	"backend/databases"
	"backend/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllOrders(c *fiber.Ctx) error {
	ctx,cancel:= context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	var orders []models.Order

	if err := databases.DB.WithContext(ctx).Find(&orders).Error; err!=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed fine orders"})
	}

	return c.JSON(orders)
}
