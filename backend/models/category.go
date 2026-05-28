package models

import "gorm.io/gorm"

type Category struct {
    gorm.Model
    Name        string `json:"name" gorm:"unique;not null"`
    Slug        string `json:"slug" gorm:"unique;not null"`
    Description string `json:"description"`
    Products []Product `json:"products,omitempty" gorm:"many2many:product_categories;"`
}