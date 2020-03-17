import router from './router'
import {getUserLogin} from 'common/js/cache'

router.beforeEach((to, from, next) => {
  next()
  const userInfo = getUserLogin()
  if (to.path !== '/login') {
    if (userInfo) { // 登录后

    } else { // 未登录
      next({ path: '/login' })
      // return
    }
  //   // 权限控制
  //   const menuInfo = getRouter()
  //   if (menuInfo != null) {
  //     const toPath = to.path
  //     console.log(123)
  //     console.log(toPath)
  //     let hasPath = false
  //     if (menuInfo.indexOf(toPath) > -1) {
  //       hasPath = true
  //     }
  //     if (hasPath) { // 有权限
  //       next()
  //     } else { // 无权限
  //       // next({ path: '/404' })
  //       console.log('没有权限访问')
  //     }
  //   }
  } else {
    next()
  }
})
