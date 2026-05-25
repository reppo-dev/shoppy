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

func AddToCart(c *fiber.Ctx) error {

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

    var req struct {
        ProductID uint `json:"product_id"`
        Quantity  int  `json:"quantity"`
    }
    
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid request body",
        })
    }

    if req.ProductID == 0 {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Product ID is required",
        })
    }
    if req.Quantity <= 0 {
        req.Quantity = 1
    }

    var cart models.Cart
    result := databases.DB.Where("user_id = ?", userID).First(&cart)
    if result.Error == gorm.ErrRecordNotFound {
        cart = models.Cart{UserID: userID}
        if err := databases.DB.Create(&cart).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to create cart",
            })
        }
    } else if result.Error != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Database error",
        })
    }

    var product models.Product
    if err := databases.DB.First(&product, req.ProductID).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Product not found",
        })
    }

    var existingItem models.CartItem
    err = databases.DB.Where("cart_id = ? AND product_id = ?", cart.ID, req.ProductID).First(&existingItem).Error

    if err == nil {
        existingItem.Quantity += req.Quantity
        if err := databases.DB.Save(&existingItem).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to update cart",
            })
        }
    } else if err == gorm.ErrRecordNotFound {

        newItem := models.CartItem{
            CartID:    cart.ID,
            ProductID: req.ProductID,
            Quantity:  req.Quantity,
            Price:     product.Price,
        }
        if err := databases.DB.Create(&newItem).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to add to cart",
            })
        }
    } else {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Database error",
        })
    }

    return c.JSON(fiber.Map{
        "message": "Product added to cart successfully",
    })
}
