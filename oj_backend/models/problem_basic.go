package models

import (
	"gorm.io/gorm"
	"time"
)

type ProblemBasic struct {
	ID                uint               `gorm:"primaryKey;" json:"id"`
	Identity          string             `gorm:"column:identity;type:varchar(36);" json:"identity"` // 问题表的唯一标识
	ProblemCategories []*ProblemCategory `gorm:"foreignKey:problem_id;reference:id"`
	Title             string             `gorm:"column:title;type:varchar(255);" json:"title"`        // 文章标题
	Content           string             `gorm:"column:content;type:text;" json:"content"`            // 文章正文
	MaxRuntime        int                `gorm:"column:max_runtime;type:int(11);" json:"max_runtime"` // 最大运行时长
	MaxMem            int                `gorm:"column:max_mem;type:int(11);" json:"max_mem"`         // 最大运行内存
	CreatedAt         time.Time          `json:"created_at"`
	UpdatedAt         time.Time          `json:"updated_at"`
	DeletedAt         gorm.DeletedAt     `gorm:"index;" json:"deleted_at"`
	TestCases         []*TestCase        `gorm:"foreignKey:problem_identity;references:identity;" json:"test_cases"` // 关联测试用例表
	PassNum           int64              `gorm:"column:pass_num;type:int(11);" json:"pass_num"`                      // 通过次数
	SubmitNum         int64              `gorm:"column:submit_num;type:int(11);" json:"submit_num"`                  // 提交次数
}

func (table *ProblemBasic) TableName() string {
	return "problem_basic"
}

func GetProblemList(keyword, categoryName string) *gorm.DB {

	tx := DB.Model(new(ProblemBasic)).
		Preload("ProblemCategories").Preload("ProblemCategories.CategoryBasic").
		Where("title like ? OR content like ?", "%"+keyword+"%", "%"+keyword+"%")

	if categoryName != "" {
		tx.Joins("RIGHT JOIN problem_category pc on pc.problem_id = problem_basic.id").
			Where("pc.category_id = (SELECT cb.id FROM category_basic cb WHERE cb.name = ?)", categoryName)
	}

	return tx
	//data := make([]*Problem, 0)
	//DB.Find(&data)
	//for _, v := range data {
	//	fmt.Printf("problem: %v \n", v)
	//}
}
