var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

// 测试接口
router.get('/users/login', function (req, res, next) {
  res.send({
    token: `token${Math.random()}`
  })
})

// 用户登录接口
router.post('/users/login', function (req, res, next) {
  let resData = { code: -1 }
  if (req.body.username === 'admin' && req.body.password === '111111') {
    resData = {
      code: 0,
      data: { token: `token${Math.random()}` }
    }
  }
  res.send(resData)
})

// 用户信息获取接口
router.post('/users/info', function (req, res, next) {
  let resData = { code: -1 }
  // mock数据：用户名
  const username = Mock.mock('@NAME')
  if (req.body.token) {
    resData = {
      code: 0,
      data: {
        // username: `username${Math.random()}`,
        username,
        role: 'admin',
        permission: [
          'dashboard',
          'role',
          'department',
          'user',
          'userCenter'
        ]
      }
    }
  }
  res.send(resData)
})

// token过期测试接口
router.post('/test', function (req, res, next) {
  let resData = { code: -2 }
  res.send(resData)
})

module.exports = router
