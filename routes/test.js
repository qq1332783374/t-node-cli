// 导入依赖
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/singin', (req, res) => {
    console.log(req.query)
    UserModel.findByEmail(req.query.email)
        .then((user) => {
            console.log('user')
            console.log(user)
            if (user) {
                return res.status(400).json({
                    status: 0,
                    message: '用户邮箱已经被注册'
                })
            } else {
                let user = {
                    name: 'test',
                    email: 'test1@qq.com',
                    password: '123456'
                }
                UserModel.create(user)
                    .then((newUser) => {
                        console.log('newUser');
                        console.log(newUser)
                        return res.status(200).json(user)
                    })
            }
        })
    // 通过邮箱查找 eMail
    // UserModel.findByEmail(req.email)
    //     .then((user) => {
    //         console.log(user)
    //     })
})

module.exports = router