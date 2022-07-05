import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',

    name: 'admin',
    redirect:'/admin/index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Base.vue'),
    meta:{
      title:'首页'
    },
    children:[
      {
        path:'index',
        name:'index',
        component: ()=> import('../views/index.vue'),
        meta:{
          title:''
        },

      },
      {
        path: 'UserInfoManagement',
        name: 'UserInfoManagement',
        component: () => import('../views/UserInfoManagement'),
        meta:{
          title:'用户信息查看'
        }
      },
      {
        path:'article',
        name:'article',
        component: ()=> import('../views/articleManage.vue'),
        meta:{
          title:'文章管理'
        }
      },
      {
        path: 'PersonalCenter',
        name: 'PersonalCenter',
        component: () => import('../views/PersonalCenter')
      },
      {
        path: '/admin/ChangePassword',
        name: '/admin/ChangePassword',
        component: () => import('../views/ChangePassword')
      },



    ]

  },
  {
    path:'/admin/login',
    name:'登录',
    component:()=>import('../views/login')
  }

]

const router = new VueRouter({
  routes
})

export default router
