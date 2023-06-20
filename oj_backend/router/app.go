package router

import (
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "oj_backend/docs"
	"oj_backend/service"
)

func Router() *gin.Engine {

	// public
	r := gin.Default()
	r.GET("/problem-list", service.GetProblemList)
	r.GET("/problem-detail", service.GetProblemDetail)

	r.GET("/user-detail", service.GetUserDetail)
	r.POST("/login", service.Login)
	r.POST("/send-code", service.SendCode)
	r.POST("/register", service.Register)
	r.GET("/rank-list", service.GetRankList)
	r.GET("/submit-list", service.GetSubmitList)

	// private
	r.GET("/problem-create", service.ProblemCreate)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}
