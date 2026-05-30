package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName  string 	`json:"user_name" gorm:"min:6;uniqueIndex"`
	FirstName string 	`json:"first_name"`
	Image     string    `json:"image"`
	LastName  string 	`json:"last_name"`
	Email     string 	`json:"email" gorm:"uniqueIndex;not null"`
	Password  string 	`json:"-"`
	Products  []Product `json:"products,omitempty" gorm:"foreignKey:UserID"`
    Orders 	  []Order 	`json:"orders,omitempty"`
}

type UserInfo struct {
	UserName  string 	`json:"user_name"`
	FirstName string 	`json:"first_name"`
	Image     string    `json:"image"`
	LastName  string 	`json:"last_name"`
	Email     string 	`json:"email"`
}