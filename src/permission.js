import router from './router'
import {getToken} from 'common/js/cache'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
