import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import users from '../pagas/users.vue'
import roles from '../pagas/roles.vue'
import rights from '../pagas/rights.vue'
import params from '../pagas/params.vue'
import categories from '../pagas/categories.vue'
import orders from '../pagas/orders.vue'
import reports from '../pagas/reports.vue'
import goods from '../pagas/goods.vue'
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
    component: home,
    redirect: '/users',
    children: [
      { path: '/users', component: users },
      { path: '/roles', component: roles },
      { path: '/rights', component: rights },
      { path: '/params', component: params },
      { path: '/categories', component: categories },
      { path: '/orders', component: orders },
      { path: '/reports', component: reports },
      { path: '/goods', component: goods }
    ]
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
