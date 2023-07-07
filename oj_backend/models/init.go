package models

import (
	"github.com/go-redis/redis/v8"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB = Init()

var RDB = redis.NewClient(&redis.Options{
	Addr:     "123.60.91.107:6379",
	Password: "123456", // no password set
	DB:       0,        // use default DB
})

func Init() *gorm.DB {
	dsn := "root:123456@tcp(123.60.91.107:13306)/oj?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println("gorm init error", err)
	}
	return db
}
