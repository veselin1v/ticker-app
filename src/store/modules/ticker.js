import axios from 'axios'

export default {
    state () {
        return {
            tickers: []
        }
    },
    getters: {
        tickers(state) {
            return state.tickers
        }
    },
    mutations: {
        setTickers(state, payload) {
            state.tickers = []
            payload.forEach(ticker => {
                state.tickers.push({
                    'id': ticker.id,
                    'name': ticker.ticker + ' (' + ticker.name + ')'
                })
            })
        }
    },
    actions: {
        async searchTicker({ commit }, name) {
            const res = await axios.get('/api/tickers/search/' + name)
            if (res.status == 200 && res.data.length > 0) {
                commit('setTickers', res.data)
            } 
        }
    }
}