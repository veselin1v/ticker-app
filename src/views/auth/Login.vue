<template>
    <div>
        <form @submit.prevent="login(credentials)">
            <div class="input-group">
                <label class="dark:text-white">Email</label>
                <input type="email" v-model="credentials.email" required>
            </div>
            <div class="input-group">
                <label class="dark:text-white">Password</label>
                <input type="password" v-model="credentials.password" required>
            </div>
            <div class="checkbox-group mt-2 mb-5">
                <input class="mr-5" type="checkbox" v-model="credentials.remember">
                <label class="dark:text-white">Remember me</label>
            </div>
            <div class="flex items-center mt-10">
               <button type="submit" class="track-btn mr-5">
                    Login
                </button>
                <router-link :to="{ name: 'passwordForgot' }" class="text-brown transition-all hover:text-orange-600 hover:underline">
                    Forgot password
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            credentials: {
                email: 'vesko@gmail.com',
                password: 'password',
                remember: false
            }
        }
    },
    methods: {
        ...mapActions(['login'])
    }
}
</script>
