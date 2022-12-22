<template>
    <div>
        <router-link to="#" @click="logout" class="nav-link">
            Logout
        </router-link>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {}
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>
