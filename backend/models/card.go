package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	UserID uint       `json:"user_id" gorm:"uniqueIndex"`
	User   User       `json:"user,omitempty"`
	Items  []CartItem `json:"items,omitempty"`
}

type CartItem struct {
	gorm.Model
	CartID    uint    `json:"cart_id"`
	Cart      Cart    `json:"cart,omitempty"`
	ProductID uint    `json:"product_id"`
	Product   Product `json:"product,omitempty"`
	Quantity  int     `json:"quantity" gorm:"default:1"`
	Price     float64 `json:"price"`
}