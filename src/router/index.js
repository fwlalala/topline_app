import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 登陆页路由
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    // 用户信息路由
    {
      path: '/user-profile',
      name: 'user-profile',
      props: true,
      component: () => import(/* webpackChunkName: "user-profile" */ '@/views/user-profile')
    },
    // 文章详情路由
    {
      name: 'article',
      path: '/article/:id',
      props: true,
      component: () => import(/* webpackChunkName: "article" */ '@/views/article/index.vue')
    },
    // 搜索界面路由
    {
      name: 'search',
      path: '/search',
      component: () => import(/* webpackChunkName: "search" */ '@/views/search/index.vue')
    },
    // 小智机器人路由
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ '@/views/chat')
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layout" */ '@/views/layout-tabbar'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/home')
        },
        {
          name: 'my',
          path: '/my',
          component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue')
        }
      ]
    }
  ]
})
