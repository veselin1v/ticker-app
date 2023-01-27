import axios from 'axios'

export default {
    state () {
        return {
            assets: [],
            asset: {}
        }
    },
    getters: {
        assets(state) {
            return state.assets
        },
        asset(state) {
            return state.asset
        }
    },
    mutations: {
        setAssets(state, payload) {
            state.assets = payload
        },
        setAsset(state, payload) {
            state.asset = payload
        }
    },
    actions: {
        async getAssets({ commit }) {
            const res = await axios.get('/api/assets')
            commit('setAssets', res.data)
        },
        async getAsset({ commit }, id) {
            const res = await axios.get('/api/assets/' + id)
            commit('setAsset', res.data)
        },
        async storeAsset({ commit, dispatch }, data) {
            const res = await axios.post('/api/assets', data)
            if (res.status == 200) {
                commit('setAlert', { type: 'success', message: res.data.message })
                dispatch('updatePortfolio', localStorage.getItem('portfolio_id')).then(() => {
                    dispatch('getPortfolio') 
                })
            }
        },
        async updateAsset({ dispatch }, id) {
           const res = await axios.put('/api/assets/' + id)
           if (res.status == 200) {
                dispatch('getAsset', id) 
            }
        }
    }
}