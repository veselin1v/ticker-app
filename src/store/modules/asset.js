import axios from 'axios'

export default {
    state () {
        return {
            assets: []
        }
    },
    getters: {
        assets(state) {
            return state.assets
        }
    },
    mutations: {
        setAssets(state, payload) {
            state.assets = payload
        }
    },
    actions: {
        async getAssets({ commit }) {
            const res = await axios.get('/api/assets')
            commit('setAssets', res.data)
        },
        async storeAsset({ commit, dispatch }, data) {
            const res = await axios.post('/api/assets', data)
            if (res.status == 200) {
                commit('setAlert', { type: 'success', message: res.data.message })
                dispatch('getPortfolio')
            }
        }
    }
}