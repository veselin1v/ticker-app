import { createStore } from 'vuex'

import Auth from '../store/modules/auth'
import Alert from '../store/modules/alert'
import Portfolio from '../store/modules/portfolio'

const store = createStore({
    modules: {
        Auth,
        Alert,
        Portfolio
    }
})

export default store
