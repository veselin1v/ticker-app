<template>
    <div>
        <form @submit.prevent="register(data)">
            <div class="input-group">
                <label>Name</label>
                <input type="text" v-model="data.name" required>
            </div>
            <div class="input-group">
                <label>Email</label>
                <input type="email" v-model="data.email" required>
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type="password" v-model="data.password" required>
            </div>
            <div class="input-group">
                <label>Confirm password</label>
                <input type="password" v-model="data.password_confirmation" required>
            </div>
            <div class="flex items-center mt-10">
               <button type="submit" class="track-btn mr-5">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            data: {
                name: 'vesko',
                email: 'vesko@gmail.com',
                password: '12345678',
                password_confirmation: '12345678',
            }
        }
    },
    methods: {
        ...mapActions(['register'])
    }
}
</script>
