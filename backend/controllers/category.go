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

func CreateCategory(c *fiber.Ctx) error {
	ctx,cancel:= context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	var cat models.CategoryInfo

	if err := c.BodyParser(&cat); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	category := models.Category{
		Name: cat.Name,
		Description: cat.Description,
		Slug: cat.Slug,
	}

	if err := databases.DB.WithContext(ctx).Create(&category).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed craete category"})
	}

	return c.JSON(fiber.Map{
		"message":"success create category",
	})
}

func UpdateCategory(c *fiber.Ctx) error {
		ctx,cancel:= context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()
	var cat models.CategoryInfo

	if err := c.BodyParser(&cat); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	id,err := strconv.Atoi(c.Params("id"))
	if err !=nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var category models.Category

	if err := databases.DB.WithContext(ctx).First(&category,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed find category"})
	}

	category.Name = cat.Name
	category.Description = cat.Description
	category.Slug = cat.Slug

	if err := databases.DB.WithContext(ctx).Save(category).Error; err !=nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed update category"})
	}

	return c.JSON(fiber.Map{"message":"success update category"})

}

func DeleteCategory(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	id , err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var category models.Category

	if err := databases.DB.WithContext(ctx).First(&category,id).Error; err!= nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found category"})
	}

	if err := databases.DB.WithContext(ctx).Delete(&category).Error; err !=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed delete category"})
	}

	return c.JSON(fiber.Map{
		"message":"success delete catefory",
	})
}