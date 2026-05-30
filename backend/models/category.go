package models

import "gorm.io/gorm"

type Category struct {
    gorm.Model
    Name        string `json:"name" gorm:"unique;not null"`
    Slug        string `json:"slug" gorm:"unique;not null"`
    Description string `json:"description"`
    Products []Product `json:"products" gorm:"many2many:product_categories;"`
}

type CategoryInfo struct {
    Name        string `json:"name" gorm:"unique;not null"`
    Slug        string `json:"slug" gorm:"unique;not null"`
    Description string `json:"description"`
}