import Vue from 'vue'
import store from '@/store'
import axios from 'axios'

const instance = axios.create({
  // baseURL: '/',
  baseURL: 'http://127.0.0.1:8888',
  // baseURL: 'http://gateway-web-api-test.kuainiujinke.com',
  headers: {
    token: store.state.user.token || '',
    username: store.state.user.username || ''
  }
})

instance.interceptors.request.use(function (config) {
  // config.headers.token = 'token'
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (res) {
  // token过期，重新登录
  if (res.data.code === -2) {
    store.dispatch('user/logout')
  }
  return res
})

Vue.http = Vue.prototype.$http = instance
