<template>
    <Alert v-if="showAlert" :alert="alert" @closeAlert="closeAlert"/>
    <component v-bind:is="layout"></component>
</template>

<script>
import Default from '../src/layouts/Default.vue'
import Alert from './components/Alert.vue'

export default {
    components: {
        Default: Default,
        Alert: Alert
    },
    computed: {
        layout () {
            return this.$route.meta.layout
        },
        showAlert() {
            return this.$store.getters.showAlert
        },
        alert() {
            return this.$store.getters.alert
        }
    },
    methods: {
        closeAlert() {
            this.$store.commit('closeAlert')
        }
    }
}
</script>
