import axios from 'axios'

export default {
    state () {
        return {
            upcomingDividends: []
        }
    },
    getters: {
        upcomingDividends(state) {
            return state.upcomingDividends
        }
    },
    mutations: {
        setUpcomingDividends(state, payload) {
            state.upcomingDividends = payload
        }
    },
    actions: {
        async getDividends({ commit }) {
            const res = await axios.get('/api/dividends')
            if (res.data != '') {
                commit('setUpcomingDividends', res.data.upcoming_dividends)
                return res.data.dividends
            }
        }
    }
}