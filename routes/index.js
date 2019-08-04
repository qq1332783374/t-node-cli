// 路由统一入口
module.exports = (app) => {
    app.use('/', require('./test'))

    // 404 处理
    app.get('*', (req, res) => {
        res.render('error/404.html', {
            title: '404 Not Found'
        })
    })
}