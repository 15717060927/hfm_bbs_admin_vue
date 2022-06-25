import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Base.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Base',
    component: () => import(/* webpackChunkName: "about" */ '../views/Base.vue'),
    children:[
      {
        path:'/user',
        name:'User',
        component: ()=> import('../views/User.vue')
      }

    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
