# My online judge

#### 代码评测平台

### 基本需求：

1.	功能性需求:
  1.	用户注册、登录、退出;
  2.	用户可以查看系统中支持的题目列表，包括题目名称、难度、标签等；
  3.	用户可以选择题目并使用一门编程语言解答；
  4.	用户可以提交自己的代码进行在线自动评测，自动评测包括自动编译和基于测试用例的自动测试；
  5.	用户可以查看自己已经解答的题目列表，包括题目名称、通过率、提交次数等；
  6.	用户排行榜，根据用户的题目解答情况（综合考虑解题数、题目难度、一次提交成功率等）进行排名；
  7.	系统管理员：管理题目及其测试用例。一个题目有多个测试用例。
  8.	非功能性要求和约束条件：
  9.	客户端为Web浏览器或IDE的插件；
  10.	同时支持1000个并发用户进行评测；
  11.	平台需要对用户输入进行安全过滤和验证，防止恶意攻击和非法操作；

### 进阶需求：

1.	用户可以查看自己提交的代码的评测结果，并查看评测详情，包括编译信息、运行时间、内存占用、输出信息等；
2.	支持多种编程语言，如C、C++、Java、Python等；
3.	支持代码提交历史记录的查看和比对，方便用户进行代码版本管理；
4.	支持题目讨论区，用户可以在讨论区中与其他用户交流问题和经验；
5.	其他创意的功能。

### 使用方法：

#### 1.后端：Golang、框架：Gin、GORM
+ 安装goland  https://golang.google.cn/dl/  
+ 参考文档 [[Module：https://www.kancloud.cn/aceld/golang/1958311](https://golang.google.cn/tour/welcome/1)https://golang.google.cn/tour/welcome/1](https://golang.google.cn/tour/welcome/1)
+ GIN中文官网：https://gin-gonic.com/zh-cn/docs/
+ GORM中文官网：https://gorm.io/zh_CN/docs/
+ 安装 jwt
```go get github.com/dgrijalva/jwt-go```
+ 配置
将 MailPassword 配置到环境变量中

后端构建

```go build -o gin-gorm-oj main.go```

#### 2. 前端： antd pro, react

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```




