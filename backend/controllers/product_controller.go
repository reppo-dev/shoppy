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

	if err := databases.DB.WithContext(ctx).Preload("Categories").Find(&products).Error; err!=nil{
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
	    if len(data.CategoryIDs) > 0 {
        var categories []models.Category
        databases.DB.Where("id IN ?", data.CategoryIDs).Find(&categories)
        databases.DB.Model(&product).Association("Categories").Append(&categories)
    }

	return c.JSON(fiber.Map{"message":"create product success"})
}

func UpdateProduct(c *fiber.Ctx) error {
	ctx,cancel:= context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	id,err := strconv.Atoi(c.Params("id"))
	if err!=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var data models.ProductInfo

	if err:= c.BodyParser(&data);err!=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	var product models.Product

	if err := databases.DB.WithContext(ctx).First(&product,id).Error; err!=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed find product"})
	}

	product.Name = data.Name
	product.Description = data.Description
	product.Image = data.Image
	product.Price = data.Price

	if err:=databases.DB.WithContext(ctx).Save(&product).Error; err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed update product"})
	}

	return c.JSON(fiber.Map{"message":"update product success"})
}

func DeleteProduct(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	id ,err := strconv.Atoi(c.Params("id"))

	if err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var product models.Product

	if err:= databases.DB.WithContext(ctx).First(&product,id).Error;err!=nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed find product"})
	}

	if err:= databases.DB.WithContext(ctx).Delete(&product).Error;err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed delete product"})
	}

	return c.JSON(fiber.Map{"message":"delete product success"})
}
