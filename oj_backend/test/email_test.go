package test

import (
	"github.com/jordan-wright/email"
	"net/smtp"
	"os"
	"testing"
)

func TestSendEmail(t *testing.T) {
	userName := "1905398049@qq.com"
	password := os.Getenv("MAIL") // qq邮箱填授权码
	e := email.NewEmail()
	e.From = "Get <1905398049@qq.com>"
	e.To = []string{"boqun.li@sjtu.edu.cn"}
	e.Subject = "验证码已发送，请查收"
	e.HTML = []byte("您的验证码：<b>" + "123456" + "</b>")
	err := e.Send("smtp.qq.com:25", smtp.PlainAuth("", userName, password, "smtp.qq.com"))
	if err != nil {
		panic(err)
	}
}
