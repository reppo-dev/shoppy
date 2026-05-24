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

func CreateProduct(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	var data models.ProductInfo

	if err := c.BodyParser(&data);err!=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	product := models.Product{
		Name: data.Name,
		Image: data.Image,
		Description: data.Description,
		Price: data.Price,
		UserID: data.UserID,
	}

	if err := databases.DB.WithContext(ctx).Create(&product).Error;err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed create product"})
	}

	return c.JSON(fiber.Map{"message":"create product success"})
}
