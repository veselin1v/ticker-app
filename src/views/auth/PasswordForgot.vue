<template>
    <div>
        <form @submit.prevent="passwordForgot(email)">
            <div class="input-group">
                <label>E-Mail Adresse</label>
                <input type="email" v-model="email" required>
            </div>
            <div class="flex items-center">
               <button type="submit" class="track-btn mr-5">
                    Passwort zurücksetzen
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
            email: 'v.ivanov@opre-it.com'
        }
    },
    methods: {
        ...mapActions(['passwordForgot'])
    }
}
</script>
