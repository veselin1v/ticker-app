<template>
	<section v-if="user" class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow py-4 px-7 border-t">
		<div id="tabs" class="flex justify-between itemst-center">
            <router-link :to="{ name: 'dashboard'}" class="flex flex-col items-center">
                <icon-dashboard class="w-6" />
                <span class="text-xs mt-2">Dashboard</span>
            </router-link>
            <router-link :to="{ name: 'portfolioIndex'}" class="flex flex-col items-center">
                <icon-chart class="w-6" />
                <span class="text-xs mt-2">Portfolio</span>
            </router-link>
            <router-link :to="{ name: 'account'}" class="flex flex-col items-center">
                <icon-account class="w-6" />
                <span class="text-xs mt-2">Account</span>
            </router-link>
            <!-- <router-link to="#" @click="logout" class="nav-link">
                Logout
            </router-link> -->
        </div>
    </section>
    <!-- <header class="shadow-md">
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
    </header> -->
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
