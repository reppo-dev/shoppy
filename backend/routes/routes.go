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

	app.Get("/products",controllers.AllProducts)
	app.Get("/products/:id",controllers.GetProduct)
	app.Post("/createproduct",controllers.CreateProduct)
	app.Put("/updateproduct/:id",controllers.UpdateProduct)
	app.Delete("/deleteproduct/:id",controllers.DeleteProduct)


	app.Get("/allorders",controllers.AllOrders)
	app.Get("/alloruserders",controllers.AllUserOrder)
	app.Post("/createorder",controllers.CreateOrder)

	app.Get("/getcart",controllers.GetCart)
	app.Post("/addtocart",controllers.AddToCart)
	app.Put(`/updatecartitem/:id`,controllers.UpdateCartItem)
	app.Delete("/deletecartitem/:id",controllers.DeleteCartItem)

	app.Get("/getbycategory",controllers.GetProductsByMultipleCategories)
	app.Get("/getcategories",controllers.GetCategories)
	app.Post("/createcategory",controllers.CreateCategory)
	app.Put("/updatecategory",controllers.UpdateCategory)
	app.Delete("/deletecategory",controllers.DeleteCategory)

	app.Get("/search", controllers.SearchProducts)
}
