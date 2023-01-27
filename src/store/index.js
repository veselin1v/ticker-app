import { createStore } from 'vuex'

import Auth from '../store/modules/auth'
import Alert from '../store/modules/alert'
import Portfolio from '../store/modules/portfolio'
import Ticker from '../store/modules/ticker'
import Asset from '../store/modules/asset'
import Dividend from '../store/modules/dividend'
import Trade from '../store/modules/trade'

const store = createStore({
    modules: {
        Auth,
        Alert,
        Portfolio,
        Ticker,
        Asset,
        Dividend,
        Trade
    }
})

export default store
