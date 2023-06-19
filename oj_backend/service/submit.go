package service

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"oj_backend/define"
	"oj_backend/models"
	"strconv"
)

// GetSubmitList
// @Tags 公共方法
// @Summary 提交列表
// @Param page query int false "page"
// @Param size query int false "size"
// @Param problem_identity query string false "problem_identity"
// @Param user_identity query string false "user_identity"
// @Param status query int false "status"
// @Success 200 {string} json "{"code":"200","msg","","data":""}"
// @Router /submit-list [get]
func GetSubmitList(c *gin.Context) {
	size, err := strconv.Atoi(c.DefaultQuery("size", define.DefaultSize))
	if err != nil {
		log.Println("size parse error: ", err)
	}

	page, er := strconv.Atoi(c.DefaultQuery("page", define.DefaultPage))
	if er != nil {
		log.Println("page parse error: ", err)
	}
	page = (page - 1) * size

	var count int64
	list := make([]models.SubmitBasic, 0)

	problemIdentity := c.Query("problem_identity")
	userIdentity := c.Query("user_identity")
	status, e := strconv.Atoi(c.Query("status"))
	if e != nil {
		log.Println("page parse error: ", err)
	}

	tx := models.GetSubmitList(problemIdentity, userIdentity, status)
	err = tx.Count(&count).Offset(page).Limit(size).Find(&list).Error

	if err != nil {
		log.Println("get_problem_list error: ", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": map[string]interface{}{
			"list":  list,
			"count": count,
		},
	})

	//c.String(http.StatusOK, "Get problems")
}
