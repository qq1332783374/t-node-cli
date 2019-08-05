// 导入依赖
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const sha1 = require('sha1');

// 数据 model
const UserModel = require('../models/users')

router.post('/', (req, res) => {
    let name = req.query.name,
        email = req.query.email,
        password = req.query.password,
        avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});

    // 通过邮箱查找
    UserModel.findByEmail(req.query.email)
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
                        return res.status(200).json(newUser)
                    })
            }
        })
})

module.exports = router