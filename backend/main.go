package main

import (
	"backend/databases"
	"backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	databases.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000/",
		AllowMethods: "GET,POST,PUT,DELETE",
    	AllowHeaders:     "Content-Type, Authorization",
    	AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")
}