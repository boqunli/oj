package test

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"testing"
	"time"
)

var ctx = context.Background()

var rdb = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "", // no password set
	DB:       0,  // use default DB
})

func TestRedisSet(T *testing.T) {
	rdb.Set(ctx, "name", "mmc", time.Second*10)
}

func TestRedisGet(T *testing.T) {
	v, err := rdb.Get(ctx, "name").Result()
	if err != nil {
		T.Fatal(err)
	}
	fmt.Println(v)
}
