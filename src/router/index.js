import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import PasswordForgot from '../views/auth/PasswordForgot.vue'
import Dashboard from '../views/Dashboard.vue'
import PortfolioIndex from '../views/portfolio/Index.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false,
            layout: 'default' 
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false,
            layout: 'default' 
        }
    },
    {
        path: '/password/forgot',
        name: 'passwordForgot',
        component: PasswordForgot,
        meta: {
            auth: false,
            layout: 'default' 
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true,
            layout: 'default',
        }
    },
    {
        path: '/portfolio',
        name: 'portfolioIndex',
        component: PortfolioIndex,
        meta: {
            auth: true,
            layout: 'default',
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { top: 500, el: to.hash, behavior: 'smooth' }
        }
        // always scroll to top
        return { top: 0, behavior: 'smooth' }
    }
})

router.beforeEach((to, from, next) => {
    const loggedIn = JSON.parse(localStorage.getItem('user'))
    if (to.meta.auth) {
        if (to.meta.auth && loggedIn == null) {
            next('/login')
        } else {
            store.dispatch('checkAuth')
            .then(()=> {
                // If users is authenticated by the backend
                next()
            })
            .catch(()=> {
                // If session is expired in the backend or the user is not allowed to see the pages (or some error)
                store.dispatch('logout')
            })
        }
    } else {
        next()
    }
})



export default router