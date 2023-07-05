package service

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"log"
	"net/http"
	"oj_backend/define"
	"oj_backend/helper"
	"oj_backend/models"
	"strconv"
	"strings"
	"time"
)

// GetUserDetail
// @Tags 公共方法
// @Summary 用户详情
// @Param name query string false "name"
// @Success 200 {string} json "{"code":"200", "data":""}"
// @Router /api/user-detail [get]
func GetUserDetail(c *gin.Context) {
	name := c.Query("name")
	if name == "" {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "用户标识不能为空",
		})
		return
	}
	data := new(models.UserBasic)
	err := models.DB.Omit("password").Where("name = ?", name).First(&data).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, gin.H{
				"code": -1,
				"msg":  "用户不存在",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "GetProblemDetail Error",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": data,
	})

}

// Login
// @Tags 公共方法
// @Summary 用户登录
// @Param userShort body define.UserShort false "username"
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/login [post]
func Login(c *gin.Context) {

	var user define.UserShort
	if err := c.ShouldBindJSON(&user); err != nil {
		// 返回错误信息
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//username := c.PostForm("username")
	//password := c.PostForm("password")
	//fmt.Printf("username : %s \npassword: %s \n", user.Username, user.Password)
	username := user.Username
	password := user.Password
	if username == "" || password == "" {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "必填信息为空",
		})
		return
	}
	password = helper.GetMd5(password)

	data := new(models.UserBasic)
	err := models.DB.Where("name = ? AND password = ? ", username, password).First(&data).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, gin.H{
				"code": -1,
				"msg":  "用户名或密码错误",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Get UserBasic Error:" + err.Error(),
		})
		return
	}

	token, er := helper.GenerateToken(data.Identity, data.Name, data.IsAdmin)
	if er != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "GenerateToken Error:" + er.Error(),
		})
		return
	}
	helper.SetCurrentUser(c, token)
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": map[string]interface{}{
			"token":    token,
			"is_admin": data.IsAdmin,
		},
	})
}

// OutLogin
// @Tags 公共方法
// @Summary 用户退出登录
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/out-login [post]
func OutLogin(c *gin.Context) {
	helper.SetCurrentUser(c, "")
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "out login success",
	})
}

// CurrentUser
// @Tags 公共方法
// @Summary 获取用户
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/current-user [get]
func CurrentUser(c *gin.Context) {
	data, err := helper.AnalyseToken(helper.GetCurrentUser(c))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Get Current User Error:" + err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": map[string]interface{}{
			"username": data.Name,
			"userid":   data.Identity,
			"is_admin": data.IsAdmin,
		},
	})
}

// SendCode
// @Tags 公共方法
// @Summary 发送验证码
// @Param email body {email: string} true "email"
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/send-code [post]
func SendCode(c *gin.Context) {
	//var body struct {
	//	Email string `json:"email"`
	//}
	//
	//if err := c.ShouldBindJSON(&body); err != nil {
	//	log.Println("[JsonBind Error] : ", err)
	//	c.JSON(http.StatusOK, gin.H{
	//		"code": -1,
	//		"msg":  "参数错误",
	//	})
	//	return
	//}
	//email := body.Email
	email := c.PostForm("email")
	//fmt.Printf("email: %s\n", email)
	if email == "" {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "参数不正确",
		})
		return
	}
	code := helper.GetRand()
	models.RDB.Set(c, email, code, time.Second*300)
	err := helper.SendCode(email, code)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Send Code Error:" + err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "验证码发送成功",
	})
}

// Register
// @Tags 公共方法
// @Summary 用户注册
// @Param email formData string true "email"
// @Param code formData string true "code"
// @Param name formData string true "name"
// @Param password formData string true "password"
// @Param phone formData string false "phone"
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/register [post]
func Register(c *gin.Context) {
	email := c.PostForm("email")
	userCode := c.PostForm("code")
	name := c.PostForm("name")
	password := c.PostForm("password")
	phone := c.PostForm("phone")
	if email == "" || userCode == "" || name == "" || password == "" {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "参数不正确",
		})
		return
	}
	// 验证验证码是否正确
	sysCode, err := models.RDB.Get(c, email).Result()
	if err != nil {
		log.Printf("Get Code Error:%v \n", err)
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "验证码不正确，请重新获取验证码",
		})
		return
	}
	if sysCode != userCode {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "验证码不正确",
		})
		return
	}
	// 判断邮箱是否已存在
	var cnt int64
	err = models.DB.Where("mail = ?", email).Model(new(models.UserBasic)).Count(&cnt).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Get User Error:" + err.Error(),
		})
		return
	}
	if cnt > 0 {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "该邮箱已被注册",
		})
		return
	}

	// 数据的插入
	userIdentity := helper.GetUUID()
	data := &models.UserBasic{
		Identity:  userIdentity,
		Name:      name,
		Password:  helper.GetMd5(password),
		Phone:     phone,
		Mail:      email,
		CreatedAt: time.Time(time.Now()),
		UpdatedAt: time.Time(time.Now()),
		IsAdmin:   0,
	}
	err = models.DB.Create(data).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Crete User Error:" + err.Error(),
		})
		return
	}

	// 生成 token
	token, er := helper.GenerateToken(userIdentity, name, data.IsAdmin)
	if er != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Generate Token Error:" + er.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": map[string]interface{}{
			"token": token,
		},
	})
}

// ChangeInfo
// @Tags 公共方法
// @Summary 用户信息修改
// @Param authorization header string true "authorization"
// @Param name formData string true "name"
// @Param password formData string true "password"
// @Param phone formData string false "phone"
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/user/change-info [put]
func ChangeInfo(c *gin.Context) {
	auth := c.GetHeader("Authorization")
	userClaim, err := helper.AnalyseToken(auth)
	if err != nil {
		c.Abort()
		c.JSON(http.StatusOK, gin.H{
			"code": http.StatusUnauthorized,
			"msg":  "Unauthorized Authorization",
		})
		return
	}
	if userClaim == nil {
		c.Abort()
		c.JSON(http.StatusOK, gin.H{
			"code": http.StatusUnauthorized,
			"msg":  "Unauthorized Authorization",
		})
		return
	}
	name := c.PostForm("name")
	password := c.PostForm("password")
	phone := c.PostForm("phone")
	if name == "" || password == "" {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "参数不正确",
		})
		return
	}

	data := new(models.UserBasic)
	er := models.DB.Where("identity = ?", userClaim.Identity).First(&data).Error
	if er != nil {
		if er == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, gin.H{
				"code": -1,
				"msg":  "用户不存在",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "changeInfo Error",
		})
		return
	}

	// 数据的插入
	newInfo := &models.UserBasic{
		Identity:  userClaim.Identity,
		Name:      name,
		Password:  helper.GetMd5(password),
		Phone:     phone,
		Mail:      data.Mail,
		CreatedAt: time.Time(time.Now()),
		UpdatedAt: time.Time(time.Now()),
		IsAdmin:   data.IsAdmin,
	}
	err = models.DB.Model(new(models.UserBasic)).Where("identity = ?", data.Identity).Updates(newInfo).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Update User Error:" + err.Error(),
		})
		return
	}

	// 生成 token
	token, e := helper.GenerateToken(userClaim.Identity, name, data.IsAdmin)
	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Generate Token Error:" + e.Error(),
		})
		return
	}
	helper.SetCurrentUser(c, token)
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": map[string]interface{}{
			"token": token,
		},
	})
}

// GetRankList
// @Tags 公共方法
// @Summary 用户排行榜
// @Param page query int false "page"
// @Param size query int false "size"
// @Success 200 {string} json "{"code":"200","data":""}"
// @Router /api/rank-list [get]
func GetRankList(c *gin.Context) {
	size, _ := strconv.Atoi(c.DefaultQuery("size", define.DefaultSize))
	page, err := strconv.Atoi(c.DefaultQuery("page", define.DefaultPage))
	if err != nil {
		log.Println("GetProblemList Page strconv Error:", err)
		return
	}
	page = (page - 1) * size

	var count int64
	list := make([]*models.UserBasic, 0)
	err = models.DB.Model(new(models.UserBasic)).Count(&count).Order("pass_num DESC, submit_num ASC").
		Offset(page).Limit(size).Find(&list).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "Get Rank List Error:" + err.Error(),
		})
		return
	}
	for _, v := range list {
		mail := strings.Split(v.Mail, "@")
		if len(mail) >= 2 {
			v.Mail = string(mail[0][0]) + "**@" + mail[1]
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": map[string]interface{}{
			"list":  list,
			"count": count,
		},
	})
}
