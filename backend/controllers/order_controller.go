package controllers

import (
	"backend/databases"
	"backend/models"
	"backend/utils"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
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
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

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

    result := databases.DB.WithContext(ctx).Where("user_id = ?", userID).Preload("Items.Product").Order("created_at desc").Find(&orders)
    
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

func CreateOrder(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

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

    var order models.Order
    err = databases.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {

        var cart models.Cart
        if err := tx.Where("user_id = ?", userID).
            Preload("Items.Product").
            First(&cart).Error; err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "error": "Cart not found",
            })
        }

        if len(cart.Items) == 0 {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "error": "Cart is empty",
            })
        }

        var totalAmount float64
        for _, item := range cart.Items {
            totalAmount += item.Price * float64(item.Quantity)
        }

        order = models.Order{
            UserID:      userID,
            Status:      models.StatusPending,
            TotalAmount: totalAmount,
        }
        if err := tx.Create(&order).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to create order",
            })
        }

        for _, cartItem := range cart.Items {
            orderItem := models.OrderItem{
                OrderID:   order.ID,
                ProductID: cartItem.ProductID,
                Quantity:  cartItem.Quantity,
                Price:     cartItem.Price,
            }
            if err := tx.Create(&orderItem).Error; err != nil {
                return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                    "error": "Failed to create order items",
                })
            }
        }

		
        if err := tx.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{}).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to clear cart",
            })
        }

        return nil
    })

    if err != nil {
        return err
    }

    var createdOrder models.Order
    databases.DB.WithContext(ctx).
        Preload("Items.Product").
        First(&createdOrder, order.ID)

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "message": "Order created successfully",
        "order":   createdOrder,
    })
}