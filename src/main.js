import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import store from './store/index'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS

// Icons
import IconClose from './components/icons/Close.vue'
import IconErrorCircle from './components/icons/ErrorCircle.vue'
import IconCheckCircle from './components/icons/CheckCircle.vue'
import IconAttentionCircle from './components/icons/AttentionCircle.vue'
import IconSpinner from './components/icons/Spinner.vue'
import IconDashboard from './components/icons/Dashboard.vue'
import IconWallet from './components/icons/Wallet.vue'
import IconAccount from './components/icons/Account.vue'
import IconFunds from './components/icons/Funds.vue'
import IconFilter from './components/icons/Filter.vue'
import IconChevronLeft from './components/icons/ChevronLeft.vue'

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = `${import.meta.env.VITE_API_TICKER}`

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.use(store)
app.use(SimpleTypeahead)

//Icons
app.component('icon-close', IconClose)
app.component('icon-error-circle', IconErrorCircle)
app.component('icon-check-circle', IconCheckCircle)
app.component('icon-attention-circle', IconAttentionCircle)
app.component('icon-spinner', IconSpinner)
app.component('icon-dashboard', IconDashboard)
app.component('icon-wallet', IconWallet)
app.component('icon-account', IconAccount)
app.component('icon-funds', IconFunds)
app.component('icon-filter', IconFilter)
app.component('icon-chevron-left', IconChevronLeft)

app.mount('#app')
