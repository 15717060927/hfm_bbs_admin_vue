import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Base.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'admin',
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
    path:'/index',
    name:'index',
    component: ()=> import('../views/index')
  }

]

const router = new VueRouter({
  routes
})

export default router
