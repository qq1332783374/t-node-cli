// 注册模块

// 导入依赖
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const sha1 = require('sha1');

// 数据 model
const UserModel = require('../models/users')

router.post('/', (req, res) => {
    let name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});

    // 通过邮箱查找
    UserModel.findByEmail(req.body.email)
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    status: 0,
                    message: '用户邮箱已经被注册'
                })
            } else {
                // 明文密码加密
                password = sha1(password)

                let user = {
                    name,
                    email,
                    password,
                    avatar
                }

                UserModel.create(user)
                    .then((newUser) => {
                        console.log('newUser')
                        console.log(newUser)
                        return res.status(200).json({
                            status: 1,
                            message: '注册成功',
                            userInfo: newUser
                        })
                    })
            }
        })
})

module.exports = router