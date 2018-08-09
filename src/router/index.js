import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/components/Layout'
import Login from '@/view/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        skipAuth: true
      }
    }
  ]
})
