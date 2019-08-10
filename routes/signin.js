// 登陆模块

// 导入依赖
const express = require('express');
const router = express.Router();
const sha1 = require('sha1'); // 密码加密
const jwt = require('jsonwebtoken');  // token 验证
const config = require('config-lite')(__dirname);
const passport = require("passport");

// 数据 model
const UserModel = require('../models/users')

router.get('/', (req, res) => {
    res.send('signin')
});

// 登陆获取token
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
                const rule = {
                    id: user._id,
                    name: user.name
                };
                jwt.sign(rule, config.secretOrKey, {expiresIn: 3600}, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: token
                    })
                })
            } else {
                return res.status(400).json({
                    status: 0,
                    message: '密码错误'
                })
            }
        })
});

//get api/users/current 获取用户信息接口
// return curren user
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        status: 1,
        message: '登陆成功',
        userInfo: {
            id:req.user.id,
            name:req.user.name,
            email:req.user.email,
            avatar: req.user.avatar,
            createdTime: req.user.date
        }
    })
});

module.exports = router;
