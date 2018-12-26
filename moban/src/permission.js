/*
 * 全局权限检测
 * 包括1、路由的全局守卫
 */

import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { getToken } from '@/common/auth'
// import { ax } from '@/common/comm'
NProgress.configure({ showSpinner: false })
// 路由全局前置守卫
const whiteList = ['/login']  // 白名单
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 有token访问login页面，就跳到首页
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 有token，没有permissions
      if (store.getters.permissions.length === 0) {
        var info = store.getters.token
        console.log('aaq', info)
        store.dispatch('pullUserInfo', {info}).then(resp => {
          // alert("aaa")
          // console.log(resp, 'resppp')
          // const permissions = resp.permissions//直接从返回数据中拿到权限permissions  此刻为空没值
          const permissions = store.getters.permissions //冲vuex store拿去权限permissions
          // console.log(permissions)
          store.dispatch('GenerateRoutes', { permissions }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // console.log(to)
            // console.log({...to})
            // hack方法 确保addRoutes已完成，set the replace: true so the navigation will not leave a history record
            // 这样我们就可以简单的通过 `next(to)` 巧妙的避开之前的那个问题了。这行代码重新进入 `router.beforeEach` 这个钩子，这时候再通过 `next()` 来释放钩子，就能确保所有的路由都已经挂载完成了。
            next({
              ...to,
              replace: true
            })
          })
        }).catch(() => {
          store.dispatch('logout').then(() => {
            next('/login')
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
