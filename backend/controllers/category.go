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
		Group("products.id").
		Preload("Categories").
		Find(&products).Error

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Query failed"})
	}
	return c.JSON(products)
}

func GetCategories(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()
	var categories models.Category

	if err := databases.DB.WithContext(ctx).Find(&categories).Error; err!= nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed find categories"})
	}

	return c.JSON(categories)

}