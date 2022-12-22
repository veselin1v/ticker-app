import { createStore } from 'vuex'

import Auth from '../store/modules/auth'
import Alert from '../store/modules/alert'
import Portfolio from '../store/modules/portfolio'
import Ticker from '../store/modules/ticker'
import Asset from '../store/modules/asset'

const store = createStore({
    modules: {
        Auth,
        Alert,
        Portfolio,
        Ticker,
        Asset
    }
})

export default store
