package models

import (
	"time"

	"gorm.io/gorm"
)

type OrderStatus string

const (
	StatusPending    OrderStatus = "pending"
	StatusProcessing OrderStatus = "processing"
	StatusShipped    OrderStatus = "shipped"
	StatusDelivered  OrderStatus = "delivered"
	StatusCancelled  OrderStatus = "cancelled"
)

type Order struct {
	gorm.Model
	UserID      uint        `json:"user_id"`
	User        User        `json:"user,omitempty"`
	Status      OrderStatus `json:"status" gorm:"default:pending"`
	TotalAmount float64     `json:"total_amount"`
	Items       []OrderItem `json:"items,omitempty"`
	ShippedAt   *time.Time  `json:"shipped_at,omitempty"`
	DeliveredAt *time.Time  `json:"delivered_at,omitempty"`
}

type OrderItem struct {
	gorm.Model
	OrderID   uint    `json:"order_id"`
	Order     Order   `json:"order,omitempty"`
	ProductID uint    `json:"product_id"`
	Product   Product `json:"product,omitempty"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}