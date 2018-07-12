"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var web_1 = require("./web");
var minapp_1 = require("./minapp");
var upload_1 = require("./upload");
var bodyParser = require("body-parser");
var app = express();
var apiRouter = express.Router();
//middleware
app.use(express.static('public')); //静态资源存放目录
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//router 允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// admin web api
web_1.webApi(apiRouter);
// min app api
minapp_1.miniApp(apiRouter);
// 上传
upload_1.uploaderRouter(apiRouter);
app.use('/api/web', apiRouter);
app.use('/api/app', apiRouter);
app.use('/api/admin', apiRouter);
var server = app.listen(8000, 'localhost', function () {
    console.log('server is running at http://localhost:8000');
});
//# sourceMappingURL=server.js.map