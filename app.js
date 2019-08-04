const path = require('path');
const express = require('express');
const ejs = require("ejs");
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const morgan = require('morgan');
const winston = require('./config/winston');

// 实例化对象
const app = express();

// 设置请求模板
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 接收表单上传的图片
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 文件上传目录
    keepExtensions: true // 保留文件后缀
}));

// 日志打印输入
app.use(morgan('combined', { stream: winston.stream }));

// 路由导入
routes(app);

// 端口监听
app.listen(config.port, () => {
    console.log(`${pkg.name} linstening on port ${config.port}`)
});