// 路由统一入口
module.exports = (app) => {
    app.use('/', require('./test'))
}