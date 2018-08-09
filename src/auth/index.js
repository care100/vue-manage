import _ from 'lodash'
import router from '@/router'
import store from '@/store'
import Layout from '@/components/Layout'
import { titles } from '@/menu'

router.beforeEach(async (to, from, next) => {
  if (!to.meta.skipAuth) {
    if (store.state.user.token) {
      if (!store.state.user.userInfo) {
        const res = await store.dispatch('user/getUserInfo')
        if (res.data.code !== 0) {
          return
        }
        const children = store.state.user.userInfo.permission.map(permission => {
          return {
            path: permission,
            name: permission,
            component: () => import(`@/view/${_.upperFirst(permission)}`)
          }
        })
        // 增加默认内容视图
        children.unshift({
          path: '',
          name: 'index',
          component: () => import('@/components/Index')
        })
        const routes = [{
          path: '/admin',
          component: Layout,
          children
        },
        {
          path: '/',
          redirect: '/admin'
        },
        {
          path: '/*',
          name: 'notFound',
          component: () => import('@/components/NotFound')
        }]
        router.addRoutes(routes)
        // 重新进入路由，使新增的路由生效
        next(to.fullPath)
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  } else {
    next()
  }
})

// 更新页面title
router.afterEach((to, from) => {
  document.title = titles[to.name]
})
