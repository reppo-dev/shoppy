package routes

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/register",controllers.Register)
	app.Post("/login",controllers.Login)
	app.Post("/logout",controllers.Logout)
	app.Get("/user",controllers.User)

	app.Get("/allproducts",controllers.AllProducts)
	app.Get("/products/:id",controllers.GetProduct)
	app.Post("/createproduct",controllers.CreateProduct)
	app.Put("/updateproduct/:id",controllers.UpdateProduct)
	app.Delete("/deleteproduct/:id",controllers.DeleteProduct)
}
