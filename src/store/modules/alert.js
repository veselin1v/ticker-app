export default {
    state () {
        return {
            showAlert: false,
            alert: {}
        }
    },
    getters: {
        showAlert(state) {
            return state.showAlert
        },
        alert(state) {
            return state.alert
        }
    },
    mutations: {
        setAlert(state, payload) {
            state.alert = payload
            state.showAlert = true
        },
        closeAlert(state) {
            state.showAlert = false
            state.alert = {}
        }
    }
}