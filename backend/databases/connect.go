package databases

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	dns := "host=localhost user=postgres password=13802002 dbname=shoppy port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dns),&gorm.Config{})
	if err !=nil {
		panic("we can't connect database")
	}

	DB = db

	db.AutoMigrate()
}