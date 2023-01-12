<template>
    <div>
        <h1>Dashboard</h1>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
        }
    },
    created() {
        const portfolio_id = localStorage.getItem('portfolio_id')
        if (portfolio_id == null) {
                this.getPortfolio().then(res => {
                if (Object.keys(res).length !== 0) {
                    localStorage.setItem('portfolio_id', res.id)
                }
            })
        }
    },
    methods: {
        ...mapActions(['getPortfolio'])
    }
}
</script>
