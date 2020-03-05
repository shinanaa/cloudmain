import router from './router'
// import {getRouter} from 'common/js/cache'

// const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // if (getRouter()) {
  //   next()
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
  next()
})
