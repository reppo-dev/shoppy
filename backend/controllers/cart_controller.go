package controllers

import (
	"backend/databases"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetCart(c *fiber.Ctx) error {

    cookie := c.Cookies("jwt")
    if cookie == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Missing authentication token",
        })
    }

    userID, err := utils.ParseJwt(cookie)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid or expired token",
        })
    }

    var cart models.Cart
    result := databases.DB.
        Where("user_id = ?", userID).
        Preload("Items.Product").
        First(&cart)

    if result.Error == gorm.ErrRecordNotFound {

        cart = models.Cart{UserID: userID}
        if err := databases.DB.Create(&cart).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to create cart",
            })
        }

        return c.JSON(fiber.Map{
            "cart":  cart,
            "items": []models.CartItem{},
            "total": 0,
        })
    }


    if result.Error != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to fetch cart",
        })
    }


    var total float64
    for _, item := range cart.Items {
        total += item.Price * float64(item.Quantity)
    }


	return c.JSON(fiber.Map{
        "cart":   cart,
        "items":  cart.Items,
        "total":  total,
        "count":  len(cart.Items),
    })
}
