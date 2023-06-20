package router

import (
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "oj_backend/docs"
	"oj_backend/middlewares"
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
	// 管理员私有方法
	authAdmin := r.Group("/admin", middlewares.AuthAdminCheck())
	//authAdmin := r.Group("/admin")
	// 问题创建
	authAdmin.POST("/problem-create", service.ProblemCreate)
	// 问题修改
	authAdmin.PUT("/problem-modify", service.ProblemModify)
	// 获取测试案例
	authAdmin.GET("/test-case", service.GetTestCase)
	// 分类创建
	authAdmin.POST("/category-create", service.CategoryCreate)
	// 分类修改
	authAdmin.PUT("/category-modify", service.CategoryModify)
	// 分类删除
	authAdmin.DELETE("/category-delete", service.CategoryDelete)

	//// 用户私有方法
	//authUser := r.Group("/user", middlewares.AuthUserCheck())
	//// 代码提交
	//authUser.POST("/submit", service.Submit)
	//

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}
