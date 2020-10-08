import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]

const router = new VueRouter({
  routes
})

// 挂在路由守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/') return next()
  if (to.path === '/home') {
    const str = window.sessionStorage.getItem('token')
    if (!str) return next({ path: '/' })
  }
  next()
})

export default router
