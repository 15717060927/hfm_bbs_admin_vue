import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Base',
    component: () => import(/* webpackChunkName: "about" */ '../views/Base.vue'),
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue')
      },


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
    path: '/index',
    name: 'index',
    component: () => import('../views/index')
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
