package test

import (
	"github.com/jordan-wright/email"
	"net/smtp"
	"net/textproto"
	"testing"
)

func TestSendEmail(t *testing.T) {
	host := "smtp.qq.com"
	port := "25"
	userName := "1905398049@qq.com"
	password := "******" // qq邮箱填授权码

	e := &email.Email{
		To:      []string{"******@qq.com", "******1@qq.com"},
		From:    userName,
		Subject: "Email Send Test",
		Text:    []byte("Text Body is, of course, supported!"),
		HTML:    []byte("<h1>This a test email</h1>"),
		Headers: textproto.MIMEHeader{},
	}

	err := e.Send(host+port, smtp.PlainAuth("", userName, password, host))
	if err != nil {
		panic(err)
	}
}
