import axios from 'axios'
import router from '../../router/index'

export default {
    state () {
        return {
            user: null
        }
    },
    getters: {
      user(state) {
        return state.user
      }
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    actions: {
        async getUser({ commit }) {
            const res = await axios.get('/api/get/user')
            commit('setUser', res.data)
        },
        async login({ dispatch }, credentials) {
          await axios.get('/sanctum/csrf-cookie')
          await axios.post('/api/login', credentials).then(() => {
            dispatch('getUser').then(() => {
              router.push({ name: 'dashboard' })
            })
          })
        },
        async register({ dispatch }, data) {
          await axios.get('/sanctum/csrf-cookie')
          await axios.post('/api/register', data).then(() => {
            dispatch('getUser').then(() => {
              router.push({ name: 'dashboard' })
            })
          })
        },
        async passwordForgot({ dispatch }, email) {
          await axios.get('/sanctum/csrf-cookie')
          await axios.post('/api/forgot-password', { email: email }).then(res => {
            console.log('res', res)
          })
        },
        async logout({ commit }) {
          await axios.get('/sanctum/csrf-cookie')
          await axios.post('/api/logout')
          router.push({ name: 'login' })
          commit('setUser', null)
          localStorage.removeItem('user')
          localStorage.removeItem('portfolio_id')
        },
        checkAuth({ }) {
          return axios.get('/api/check/auth')
        }
    }
}