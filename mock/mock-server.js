var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()
// 跨域设置
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,username,token')
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,PUT')
  next()
})
// body parser中间件
app.use(bodyParser.json())
// 启用路由
app.use('/', router)
app.listen(8888, function () {
  console.log('Server listen on 8888')
})
