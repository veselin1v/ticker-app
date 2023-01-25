import axios from 'axios'

export default {
    state () {
        return {
            upcomingDividends: [],
            receivedDividends: []
        }
    },
    getters: {
        upcomingDividends(state) {
            return state.upcomingDividends
        },
        receivedDividends(state) {
            return state.receivedDividends
        }
    },
    mutations: {
        setUpcomingDividends(state, payload) {
            state.upcomingDividends = payload
        },
        setReceivedDividends(state, payload) {
            state.receivedDividends = payload
        }
    },
    actions: {
        async getDividends({ commit }) {
            const res = await axios.get('/api/dividends')
            if (res.data != '') {
                commit('setUpcomingDividends', res.data.upcoming_dividends)
                commit('setReceivedDividends', res.data.received_dividends)
                return res.data.dividends
            }
        }
    }
}