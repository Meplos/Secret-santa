import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthApp from '../views/AuthApp.vue'
import Login from '../views/LogIn.vue'
import CreateAccount from '../views/CreateAccount.vue'
import store from "../store/index"
Vue.use(VueRouter)

function isAuth() {
  return store.state.token
}

function authCheck(to, from, next) {
  if (isAuth()) {
    next()
  }
  else {
    next({ name: 'Login' })
  }
}


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/createAccount',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/',
    name: 'AuthApp',
    component: AuthApp,
    beforeEnter: authCheck
  }

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        }
        else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})
export default router
