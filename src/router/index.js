import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/components/layout/layout'
export default new Router({
  routes: [
    { path: '/login', component: () => import('@/components/login/login') },
    { path: '/', redirect: '/home' },
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('@/components/layout/layout'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/components/home/home') },
        {
          path: '/system',
          component: () => import('@/components/moduleLayout/moduleLayout'),
          redirect: '/user',
          children: [
            { path: '/user', component: () => import('@/views/system/user') },
            { path: '/module', component: () => import('@/views/system/module') },
            { path: '/plugin', component: () => import('@/views/system/plugin') }
          ]
        }
      ]
    }
  ]
})
