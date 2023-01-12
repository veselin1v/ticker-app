import axios from 'axios'

export default {
    state () {
        return {
            portfolio: []
        }
    },
    getters: {
        portfolio(state) {
            return state.portfolio
        }
    },
    mutations: {
        setPortfolio(state, payload) {
            state.portfolio = payload
        }
    },
    actions: {
        async getPortfolio({ commit }) {
            const res = await axios.get('/api/portfolios')
            commit('setPortfolio', res.data)
            return res.data
        },
        async storePortfolio({ commit, dispatch }, name) {
            const res = await axios.post('/api/portfolios', { name: name })
            if (res.status == 200) {
                commit('setAlert', { type: 'success', message: res.data.message })
                dispatch('getPortfolio')
            }
        },
        async updatePortfolio({}, id) {
            await axios.put('/api/portfolios/' + id)
        }
    }
}