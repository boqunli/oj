package router

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "oj_backend/docs"
	"oj_backend/middlewares"
	"oj_backend/service"
)

func Router() *gin.Engine {
	r := gin.Default()

	store := cookie.NewStore([]byte("secret")) // public
	r.Use(sessions.Sessions("mysession", store))

	api := r.Group("/api")
	api.GET("/problem-list", service.GetProblemList)
	api.GET("/problem-detail", service.GetProblemDetail)

	api.GET("/user-detail", service.GetUserDetail)
	api.POST("/login", service.Login)
	api.POST("/out-login", service.OutLogin)

	api.POST("/send-code", service.SendCode)
	api.POST("/register", service.Register)
	api.GET("/rank-list", service.GetRankList)
	api.GET("/submit-list", service.GetSubmitList)
	api.GET("/category-list", service.GetCategoryList)

	api.GET("/current-user", service.CurrentUser)

	// private
	// 管理员私有方法
	authAdmin := api.Group("/admin", middlewares.AuthAdminCheck())
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
	authUser := api.Group("/user", middlewares.AuthUserCheck())
	//// 代码提交
	authUser.POST("/submit", service.Submit)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}
