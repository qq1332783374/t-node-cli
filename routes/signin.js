// 导入依赖
const express = require('express');
const router = express.Router();
const sha1 = require('sha1');

// 数据 model
const UserModel = require('../models/users')

router.get('/', (req, res) => {
    res.send('signin')
})

router.post('/', (req, res) => {
    let email = req.query.email,
        password = req.query.password
    UserModel.findByEmail(email)
        .then((user) => {
            console.log('find user')
            console.log(user)
            // 查找用户是否存在
            if (!user) {
                return res.status(404).json({
                    status: 0,
                    message: '用户邮箱不存在'
                })
            }

            // 匹配密码
            if (sha1(password) === user.password) {
                return res.status(200).json({
                    status: 1,
                    message: '登陆成功'
                })
            } else {
                return res.status(400).json({
                    status: 0,
                    message: '密码错误'
                })
            }
        })
})

module.exports = router