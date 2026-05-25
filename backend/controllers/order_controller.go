package controllers

import (
	"backend/databases"
	"backend/models"
	"backend/utils"
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

func AllUserOrder(c *fiber.Ctx) error {
    cookie := c.Cookies("jwt")
    if cookie == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Missing token",
        })
    }

    userID, err := utils.ParseJwt(cookie)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid or expired token",
        })
    }

    var orders []models.Order

    result := databases.DB.Where("user_id = ?", userID).Preload("Items.Product").Order("created_at desc").Find(&orders)
    
    if result.Error != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to fetch orders",
        })
    }

    if len(orders) == 0 {
        return c.JSON(fiber.Map{"orders": []models.Order{},"count":  0,})
    }

    return c.JSON(fiber.Map{
        "orders": orders,
        "count":  len(orders),
    })
}