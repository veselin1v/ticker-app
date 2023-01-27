<template>
    <Modal v-if="showTradeModal" @close-modal="closeTradeModal" title="Add new trade">
        <form @submit.prevent="storeTrade(tradeData);closeTradeModal()">
            <div class="text-center">
                <h1 class="text-brown text-xl">{{ asset.ticker }}</h1>
            </div>
            <div class="input-group text-white">
                <label>Trade</label>
                <select v-model="tradeData.trade" class="dark:dark" required>
                    <option value="buy">buy</option>
                    <option value="sell">sell</option>
                </select>
            </div>
            <div class="input-group text-white">
                <label>Quantity</label>
                <input type="number" step=".01" class="dark:dark" placeholder="Enter quantity" v-model="tradeData.quantity" required>
            </div>
            <div class="input-group text-white">
                <label>Price per share</label>
                <input type="number" step=".01" class="dark:dark" placeholder="Enter price per share" v-model="tradeData.price_per_share" required>
            </div>
            <div class="text-center">
                <button class="track-btn mt-10">Add trade</button>
            </div>
        </form>
    </Modal>
    <icon-chevron-left class="fill-white w-2" @click="$router.push({ name: 'portfolio' })" />
    <div class="text-center mt-5">
        <h1 class="text-brown text-xl">{{ asset.ticker }}</h1>
    </div>
    <div class="dark:text-white flex justify-between border-y py-4 my-10">
        <div class="flex flex-col gap-1">
            <div class="flex justify-between">
                <span class="mr-3">Invested:</span>
                <span>${{ asset.invested }}</span>
            </div>
            <div class="flex justify-between">
                <span class="mr-3">Position worth:</span>
                <span>${{ asset.position_worth }}</span>
            </div>
            <div class="flex justify-between">
                <span class="mr-3">Average price:</span>
                <span>${{ asset.average_price }}</span>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <div class="flex justify-between">
                <span class="mr-3">Quantity:</span>
                <span>{{ asset.quantity }}</span>
            </div>
            <div class="flex justify-between">
                <span class="mr-3">Profit:</span>
                <span :class="[asset.profit > 0 ? 'green' : 'red']">{{ formatAmount(asset.profit) }}</span>
            </div>
            <div class="flex justify-between">
                <span class="mr-3">ROI:</span>
                <span :class="[asset.roi > 0 ? 'green' : 'red']">{{ asset.roi != null ? asset.roi.toFixed(2) : null }}%</span>
            </div>
        </div>
    </div>
    <table class="table-auto w-full" v-if="asset.trades && asset.trades.length">
        <thead>
            <tr>
                <th class="dark:text-white">
                    <div class="flex">
                        <span>Trade</span>
                    </div>
                </th>
                <th class="dark:text-white">
                    <div class="flex justify-end">
                        <span>Quantity</span>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trade in asset.trades">
                <td>
                    <ul>
                        <li :class="[trade.trade == 'buy' ? 'green' : 'red']">{{ trade.trade }}</li>
                        <li class="text-xs dark:text-white">{{ trade.created_at_format }}</li>
                    </ul>
                </td>
                <td class="text-right">
                    <ul>
                        <li class="dark:text-white">${{ trade.total_price }}</li>
                        <li class="text-xs dark:text-white">{{ trade.quantity }} x ${{ trade.price_per_share }}</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="fixed bottom-28 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <button class="track-btn text-lg" @click="showTradeModal = true">Add trade</button>
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '../components/Modal.vue'
export default {
    data() {
        return {
            showTradeModal: false,
            tradeData: {
                asset_id: this.$route.params.id,
                trade: 'buy',
                quantity: '',
                price_per_share: ''
            },
        }
    },
    created() {
        this.getAsset(this.$route.params.id)
    },
    methods: {
        ...mapActions(['getAsset', 'storeTrade']),
        formatAmount(amount) {
            if (amount) {
                if (amount.toString().substring(0, 1) === '-') {
                    return '-$' + amount.toFixed(2).toString().substring(1)
                }
                return '$' + amount.toFixed(2)
            }
        },
        closeTradeModal() {
            this.showTradeModal = false
            this.tradeData = {
                asset_id: this.$route.params.id,
                trade: 'buy'
            }
        }
    },
    computed: {
        ...mapGetters(['asset'])
    },
    components: {
        Modal: Modal
    }
}
</script>