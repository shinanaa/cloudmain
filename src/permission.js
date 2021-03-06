import router from './router'
import {getUserLogin, getRouteList} from 'common/js/cache'

const whiteList = ['/home', '/login', '/system']

router.beforeEach((to, from, next) => {
  next()
  const userInfo = getUserLogin()
  if (to.path !== '/login') {
    // 登录验证
    if (userInfo) {
      if (whiteList.indexOf(to.path) > -1) {
        next()
      } else {
        const menuInfo = getRouteList()
        if (menuInfo) {
          console.log('luyou')
          console.log(menuInfo)
          if (menuInfo.indexOf(to.path) > -1) {
            next()
          } else {
            next({ path: '/home' })
            console.log('没有访问权限')
          }
        }
        next()
      }
    } else {
      next({ path: '/login' })
      // return
    }
  //   // 权限控制
  //   if (menuInfo != null) {
  //     const toPath = to.path
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
