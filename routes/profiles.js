// 用户增删改查
const express = require('express');
const router = express.Router();
const passport = require("passport");

const ProfilesModel = require('../models/profiles');

/**
 * @apiname 添加新用户
 * @method post
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  let profileFileds = {};
  if (req.body.type) profileFileds.type = req.body.type;
  if (req.body.describe) profileFileds.describe = req.body.describe;
  if (req.body.income) profileFileds.income = req.body.income;
  if (req.body.expend) profileFileds.expend = req.body.expend;
  if (req.body.cash) profileFileds.cash = req.body.cash;
  if (req.body.remark) profileFileds.remark = req.body.remark;

  ProfilesModel.createUser(profileFileds)
    .then(user => {
      res.json({
        status: 1,
        message: '添加成功',
        info: user
      })
    })
})

// 获取全部用户
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  ProfilesModel.getAllUser()
    .then(allUser => {
      res.json({
        status: 1,
        message: '全部信息',
        allUser: allUser
      })
    })
})

// 通过用户 id 查找用户
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ProfilesModel.getUserById(req.params.id)
    .then((user) => {
      console.log('user')
      console.log(user)
      if (user) {
        res.json({
          status: 0,
          message: '查找成功',
          userInfo: user
        })
      } else {
        res.json({
          status: 0,
          message: '用户不存在'
        })
      }
    })
})

// 编辑信息
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  let profileFileds = {};
  if (req.params.id) profileFileds._id = req.params.id;
  if (req.body.type) profileFileds.type = req.body.type;
  if (req.body.describe) profileFileds.describe = req.body.describe;
  if (req.body.income) profileFileds.income = req.body.income;
  if (req.body.expend) profileFileds.expend = req.body.expend;
  if (req.body.cash) profileFileds.cash = req.body.cash;
  if (req.body.remark) profileFileds.remark = req.body.remark;

  ProfilesModel.editUserById(profileFileds)
    .then((editUser) => {
      res.json({
        status: 1,
        message: '用户信息修改成功',
        userInfo: editUser
      })
    })
})

// 删除信息
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ProfilesModel.deleteUserById(req.params.id)
    .then((delUser) => {
      if (delUser) {
        res.json({
          status: 1,
          message: '删除成功'
        })
      } else {
        res.json({
          status: 0,
          message: '删除失败, 改用户已经被删除'
        })
      }
    }).catch(err=>{
      res.json("删除失败")
    })
})

module.exports = router;
