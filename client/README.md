人大履职前端展示页面

### 本地运行代码

```
npm install
npm start
```

### 部署

服务器上的操作，服务器主目录下：

```
git clone git@git.coding.net:billie66/auth-system.git
cd auth-system/client
npm install
npm run build
mkdir public
cp -rf index.html dist public
node server.js
```

