import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/components/layout/layout'
export default new Router({
  mode: 'history',
  // base: 'portal/admin',
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
            { path: '/module', component: () => import('@/views/system/module'), meta: {title: '模块管理'} },
            { path: '/plugin', component: () => import('@/views/system/plugin'), meta: {title: '功能管理'} },
            { path: '/role', component: () => import('@/views/system/role'), meta: {title: '角色管理'} },
            { path: '/user', component: () => import('@/views/system/user'), meta: {title: '用户管理'} },
            { path: '/notice', component: () => import('@/views/system/notice'), meta: {title: '通知公告'} },
            { path: '/unit', component: () => import('@/views/system/unit'), meta: {title: '单位管理'} }, // 后续添加轮播管理
            { path: '/log', component: () => import('@/views/system/log'), meta: {title: '日志管理'} },
            { path: '/carousel', component: () => import('@/views/system/carousel'), meta: {title: '单位功能管理'} }
          ]
        },
        {
          path: '/unit',
          component: () => import('@/components/moduleLayout/moduleLayout'),
          redirect: '/user',
          children: [
            { path: '/module', component: () => import('@/views/system/module'), meta: {title: '模块管理'} },
            { path: '/plugin', component: () => import('@/views/system/plugin'), meta: {title: '功能管理'} },
            { path: '/role', component: () => import('@/views/system/role'), meta: {title: '角色管理'} },
            { path: '/user', component: () => import('@/views/system/user'), meta: {title: '用户管理'} },
            { path: '/notice', component: () => import('@/views/system/notice'), meta: {title: '通知公告'} },
            { path: '/unit', component: () => import('@/views/system/unit'), meta: {title: '单位管理'} },
            { path: '/log', component: () => import('@/views/system/log'), meta: {title: '日志管理'} },
            { path: '/carousel', component: () => import('@/views/system/carousel'), meta: {title: '轮播管理'} }
          ]
        }
      ]
    }
  ]
})
