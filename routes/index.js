// 路由统一入口
module.exports = (app) => {
    // 首页
    app.get('/', (req, res) => {
        res.render('index')
    })

    // 注册
    app.use('/signup', require('./signup'))

    // 登陆
    app.use('/signin', require('./signin'))

    // 404 处理
    app.get('*', (req, res) => {
        res.render('error/404.html', {
            title: '404 Not Found'
        })
    })
}