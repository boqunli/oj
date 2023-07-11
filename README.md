# My online judge

#### 代码评测平台

### 基本功能:

  1.	用户注册、登录、退出;
  2.	用户可以查看系统中支持的题目列表，包括题目名称、难度、标签等；
  3.	用户可以选择题目并使用一门编程语言解答；
  4.	用户可以提交自己的代码进行在线自动评测，自动评测包括自动编译和基于测试用例的自动测试；
  5.	用户可以查看自己已经解答的题目列表，包括题目名称、通过率、提交次数等；
  6.	用户排行榜，根据用户的题目解答情况（综合考虑解题数、题目难度、一次提交成功率等）进行排名；
  7.	系统管理员：管理题目及其测试用例。一个题目有多个测试用例。
  8.	非功能性要求和约束条件：
     1.	客户端为Web浏览器或IDE的插件；
     2.	同时支持1000个并发用户进行评测；
     3.	平台需要对用户输入进行安全过滤和验证，防止恶意攻击和非法操作；

### 进阶功能：

1.	用户可以查看自己提交的代码的评测结果，并查看评测详情，包括编译信息、运行时间、内存占用、输出信息等；
2.	支持多种编程语言，如C、C++、Java、Python等；
3.	支持代码提交历史记录的查看和比对，方便用户进行代码版本管理；
4.	支持题目讨论区，用户可以在讨论区中与其他用户交流问题和经验；
5.	其他创意的功能。



# 使用方法：



## 1. 后端：Golang、框架：Gin、GORM

+ 安装goland  https://golang.google.cn/dl/  
+ 参考文档 [[Module：https://www.kancloud.cn/aceld/golang/1958311](https://golang.google.cn/tour/welcome/1)https://golang.google.cn/tour/welcome/1](https://golang.google.cn/tour/welcome/1)
+ GIN中文官网：https://gin-gonic.com/zh-cn/docs/
+ GORM中文官网：https://gorm.io/zh_CN/docs/
+ 安装 jwt
```go get github.com/dgrijalva/jwt-go```
+ 配置
将 MailPassword 配置到环境变量中

​	后端构建

​	```go build -o gin-gorm-oj main.go```



## 2. 前端： antd pro, react

#### Environment Prepare

​	Install `node_modules`:

```bash
npm install
```

​	or

```bash
yarn
```

#### Provided Scripts

​	Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

​	Scripts provided in `package.json`. It's safe to modify or add additional script:

#### Start project

```bash
npm start
```

#### Build project

```bash
npm run build
```

#### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

#### Test code

```bash
npm test
```



# 部署

推荐使用 docker-compose 一键部署

### 分步部署

##### 后端部署

##### oj_backend

切换目录

```
cd oj/oj_backend
```

使用的docker file 

```dockerfile
# 使用 Golang 官方提供的基础镜像

FROM golang:latest

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64 \
    GOPROXY=https://goproxy.cn,direct

# 设置工作目录

WORKDIR /app

# 复制应用程序文件到镜像中

COPY . .



# 编译应用程序

RUN go build -o main .

EXPOSE 8080

# 设置容器启动命令

CMD ["./main"]
```

启动docker

```bash
docker build -t oj_backend .
docker run -p 8080:8080 -d oj_backend
```

查看docker进程

```bash
docker ps
```

 运行结果

```bash
CONTAINER ID   IMAGE         COMMAND                  CREATED             STATUS             PORTS                                                  NAMES
xxx   oj_backend    "./main"                 29 minutes ago      Up 29 minutes      0.0.0.0:8080->8080/tcp, :::8080->8080/tcp              vigilant_shaw
```

##### 部署mysql

```bash
docker run --name mysql -d -p 3306:3306 -v /root/boqun/oj/oj_backend/data/mysql/log:/var/log/mysql -v /root/boqun/oj/oj_backend/data/mysql/data:/var/lib/mysql -v /root/boqun/oj/oj_backend/data/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
```

##### 部署Redis

```bash
docker run -itd --name redis-test -p 6379:6379 redis:6.2.6 --requirepass "123456"
```

##### 部署前端

使用nginx 部署

```dockerfile
 # 配置nginx
  nginx:
    image: nginx:latest
    container_name: oj_frontend
    ports:
      - "8000:8000" # 注意此处配置的端口要和nginx.conf文件中监听的端口一致
    volumes:
      - ./oj_frontend/dist:/usr/local/nginx/html
      - ./oj_frontend/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./oj_frontend/nginx/logs:/var/log/nginx
    networks:
      - oj_net

```

其中nginx配置文件

nginx.conf

```nginx

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
    root /usr/share/nginx/html/dist;
    include /etc/nginx/conf.d/*.conf;


    server{
       listen 8000;
       charset utf-8;
       server_name 123.60.91.107;
        location / {
            # 用于配合 browserHistory使用
            root /usr/share/nginx/html/dist;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;

            # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
            # rewrite ^/(.*)$ https://preview.pro.ant.design/$1 permanent;

        }
        location /api {
            proxy_pass http://123.60.91.107:8080;
            proxy_redirect default;
        }
    }
}
```

default.conf

```nginx

# 服务器配置
server {
    listen 8000;
    # server_name oj_frontend;

    # 静态文件位置
    root /usr/share/nginx/html/dist;
    index index.html;

    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
    }

    # # 反向代理到后端应用
    # location /api {
    #     proxy_pass http://localhost:8080;
    # }

    # 错误页面处理
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    location = /50x.html {
        root /usr/share/nginx/html/dist
    ;
    }
}
```



#### 使用docker-compose 一键部署

```dockerfile
version: '3' # docker-compose的版本号

services:
  oj_backend: # 服务名唯一，配置amieemc后台服务
    build: # 启动服务时先将build指令中的Dockerfile打包成镜像，再去运行镜像，镜像名会带有前缀（当前的目录名）
      context: ./oj_backend #指定Dockerfile所在的上下文目录，"."表示当前目录
      dockerfile: Dockerfile # Dockerfile文件名称
    container_name: oj_backend # 容器名称
    volumes: 
      - ./oj_backend:/usr/local/oj_backend # 挂载宿主机上的后端文件目录到容器中对应的目录下，需要提前创建好主机上的目录
    ports:
      - "8080:8080" # 宿主主机端口号:容器端口号
    depends_on: # 服务依赖的其他服务，按照指定的顺序先启动依赖的服务，再启动后端项目服务
      - mysql
      - redis
      - nginx
    networks:
      - oj_net
  
  # 配置redis
  redis:
    image: redis:6.2.6 # redis镜像 
    container_name: oj_redis # redis镜像的容器名称
    ports:
      - "6379:6379" # 主机端口和容器端口的映射，后台项目服务中application.yml中的redis配置的端口，要为主机端口
    volumes:
      - ./oj_backend/data/redis:/data # 挂载Redis存储数据目录到容器中，持久化数据库数据，避免因容器停止导致数据丢失的情况
    command: "redis-server --appendonly yes --requirepass 123456" #此命令用来覆盖容器默认命令
    networks:
      - oj_net
  
  ## 配置mysql
  mysql:
    image: mysql:5.7
    container_name: oj_mysql
    volumes:
      - ./oj_backend/data/mysql/log:/var/log/mysql
      - ./oj_backend/data/mysql/data:/var/lib/mysql
      - ./oj_backend/data/mysql/conf:/etc/mysql/conf.d
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=oj
    command: --explicit_defaults_for_timestamp
    networks:
      - oj_net

  # 配置nginx
  nginx:
    image: nginx:latest
    container_name: oj_frontend
    ports:
      - "8000:8000" # 注意此处配置的端口要和nginx.conf文件中监听的端口一致
    volumes:
      - ./oj_frontend/dist:/usr/share/nginx/html/dist
      - ./oj_frontend/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./oj_frontend/nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./oj_frontend/nginx/logs:/var/log/nginx
    networks:
      - oj_net

networks:
  oj_net:
    driver: bridge
```







​	
