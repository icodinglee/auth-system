人大履职后端 API

先创建图片存储位置

```
mkdir public
cd public
mkdir uploads
cd uploads
mkdir avatars
```

本地运行

```
npm install -g nodemon
npm install
npm run dev
```

另外打开一个终端窗口，启动 mongod 服务, 为的是把数据存入数据库，在项目根目录下执行：

```
mkdir data
mongod --dbpath=./data --port 27017
```
