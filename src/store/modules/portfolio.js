import axios from 'axios'

export default {
    state () {
        return {
            portfolios: []
        }
    },
    getters: {
        portfolios(state) {
            return state.portfolios
        }
    },
    mutations: {
        setPortfolios(state, payload) {
            state.portfolios = payload
        }
    },
    actions: {
        async getPortfolios({ commit }) {
            const res = await axios.get('/api/portfolios')
            commit('setPortfolios', res.data)
        },
        async storePortfolio({ commit, dispatch }, name) {
            const res = await axios.post('/api/portfolios', { name: name })
            if (res.status == 200) {
                commit('setAlert', { type: 'success', message: res.data.message })
                dispatch('getPortfolios')
            }
        }
    }
}