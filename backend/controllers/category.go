package controllers

import (
	"backend/databases"
	"backend/models"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetProductsByMultipleCategories(c *fiber.Ctx) error {
	
	categoryIDsStr := c.Query("categories")
	if categoryIDsStr == "" {
		return c.Status(400).JSON(fiber.Map{"error": "No categories provided"})
	}

	var ids []uint
	for _, s := range strings.Split(categoryIDsStr, ",") {
		id, _ := strconv.ParseUint(s, 10, 32)
		ids = append(ids, uint(id))
	}

	var products []models.Product
	err := databases.DB.
		Joins("JOIN product_categories ON product_categories.product_id = products.id").
		Where("product_categories.category_id IN ?", ids).
		Group("products.id").  // حذف تکراری‌ها
		Preload("Categories"). // اگر می‌خواهی دسته‌بندی هر محصول هم بیاید
		Find(&products).Error

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Query failed"})
	}
	return c.JSON(products)
}