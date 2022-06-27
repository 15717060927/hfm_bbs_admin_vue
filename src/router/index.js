import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',

    name: 'admin',
    redirect:'/admin/index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Base.vue'),
    children:[
      {
        path:'index',
        name:'index',
        component: ()=> import('../views/index.vue')
      },
      {
        path:'user',
        name:'user',
        component: ()=> import('../views/userManage.vue')
      },
      {
        path:'article',
        name:'article',
        component: ()=> import('../views/articleManage.vue')
      },
      ]


  },


  {
    path: '/admin/UserInfoManagement',
    name: 'UserInfoManagement',
    component: () => import('../views/UserInfoManagement')
  },
  {
    path: '/admin/PersonalCenter',
    name: '/admin/PersonalCenter',
    component: () => import('../views/PersonalCenter')
  }

]

const router = new VueRouter({
  routes
})

export default router
