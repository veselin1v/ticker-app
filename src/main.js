import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import store from './store/index'

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = `${import.meta.env.VITE_API_TICKER}`

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.use(store)
app.mount('#app')
