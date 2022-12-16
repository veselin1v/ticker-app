<template>
    <header class="shadow-md">
        <nav class="container mx-auto flex justify-between items-center px-20 py-6">
            <div class="brand">
                <router-link :to="{ name: 'dashboard'}" class="nav-link">
                    <img src="/assets/vue.svg" class="w-1/2">
                </router-link>
            </div>
            <div class="space-x-5" v-if="!user">
                <router-link :to="{ name: 'login'}" class="nav-link">
                    Login
                </router-link>
                <router-link :to="{ name: 'register'}" class="nav-link">
                    Register
                </router-link>
            </div>
            <div class="space-x-5" v-else>
                <router-link :to="{ name: 'dashboard'}" class="nav-link">
                    Dashboard
                </router-link>
                <router-link :to="{ name: 'portfolioIndex'}" class="nav-link">
                    Portfolio
                </router-link>
                <router-link to="#" @click="logout" class="nav-link">
                    Logout
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            user: localStorage.getItem('user')
        }
    },
    watch:{
        $route (to, from) {
            this.user = localStorage.getItem('user')
        }
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>
