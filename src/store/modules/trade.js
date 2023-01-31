import axios from 'axios'

export default {
    state () {
        return {}
    },
    getters: {},
    mutations: {},
    actions: {
        async storeTrade({ commit, dispatch }, data) {
            const res = await axios.post('/api/trades', data)
            if (res.status == 200) {
                commit('setAlert', { type: res.data.status, message: res.data.message })
                dispatch('updateAsset', data.asset_id)
            }
        }
    }
}