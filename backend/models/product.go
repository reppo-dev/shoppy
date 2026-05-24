package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name string `json:"name"`
	Image string `json:"image"`
	Description string `json:"description"`
	Price float64 `json:"price"`
    UserID      uint    `json:"user_id"`
    User        User    `json:"user" gorm:"foreignKey:UserID"`
}


type ProductInfo struct {
	Name string `json:"name"`
	Image string `json:"image"`
	Description string `json:"description"`
	Price float64 `json:"price"`
    UserID      uint    `json:"user_id"`
}