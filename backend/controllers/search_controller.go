package controllers

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func SearchProducts(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    query := c.Query("q")
    categoryIDsStr := c.Query("categories")

    dbQuery := databases.DB.WithContext(ctx).Model(&models.Product{}).Preload("Categories")

    if query != "" {
        dbQuery = dbQuery.Where("name ILIKE ?", "%"+query+"%")
    }

    if categoryIDsStr != "" {
        var ids []uint
        for _, s := range strings.Split(categoryIDsStr, ",") {
            id, err := strconv.ParseUint(s, 10, 32)
            if err == nil {
                ids = append(ids, uint(id))
            }
        }
        if len(ids) > 0 {
            dbQuery = dbQuery.Joins("JOIN product_categories ON product_categories.product_id = products.id").
                Where("product_categories.category_id IN ?", ids).
                Group("products.id")
        }
    }

    var products []models.Product
    if err := dbQuery.Find(&products).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Search failed",
        })
    }
    return c.JSON(products)
}