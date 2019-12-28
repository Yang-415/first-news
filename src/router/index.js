import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'
// import home from '../views/home/home.vue'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  component: Home,
  children: [
    {
      path: '/',
      component: () => import('../views/home/home.vue')
    },
    {
      path: '/home/comment',
      component: () => import('../views/comment')
    },
    {
      path: '/home/material',
      component: () => import('../views/material')
    },
    {
      path: '/home/articles',
      component: () => import('../views/articles')
    },
    {
      path: '/home/publish',
      component: () => import('../views/publish')
    },
    {
      path: '/home/publish/:articleId',
      component: () => import('../views/publish')
    }
    // {path:""

    // }
  ]
}, {
  path: '/login',
  component: Login
}
]
const router = new VueRouter({
  routes
})

export default router
