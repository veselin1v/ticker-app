<template>
    <div class="text-center">
        <h1 class="text-lg text-brown mb-5">Positions</h1>
        <table class="table-auto w-full" v-if="assets.length">
            <thead>
                <tr>
                    <th class="dark:text-white pt-0">Asset</th>
                    <th class="text-right dark:text-white pt-0">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asset in assets" :key="asset">
                    <td class="text-white">{{ asset.ticker.ticker }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
        this.getAssets()
    },
    computed: {
        ...mapGetters(['assets'])
    },
    methods: {
        ...mapActions(['getPortfolio', 'getAssets'])
    }
}
</script>
