<template>
    <div>
        <Modal v-if="showPortfolioModal" @close-modal="closePortfolioModal" title="Add new portfolio">
            <form @submit.prevent="storePortfolio(name);closePortfolioModal()">
                <div class="input-group">
                    <label>Portfolio name</label>
                    <input type="text" placeholder="Enter your portfolio name" v-model="name" required>
                </div>
                <div class="text-center">
                    <button class="track-btn mt-10">Create porftolio</button>
                </div>
            </form>
        </Modal>
        <Modal v-if="showAssetModal" @close-modal="closeAssetModal" title="Add new asset">
            <form @submit.prevent="assetData.portfolio_id = portfolio.id;storeAsset(assetData);closeAssetModal()">
                <div class="input-group mb-5">
                    <label>Asset ticker or name</label>
                    <vue3-simple-typeahead
                        placeholder="Enter asset ticker or name" 
                        v-model="assetData.asset"
                        @input="searchTicker(assetData.asset)"
                        :itemProjection="itemProjection"
                        @selectItem="selectItemEventHandler"
                        required
                        :items="tickers"
                        :minInputLength="1"
                    />
                </div>
                <div class="input-group">
                    <label>Quantity</label>
                    <input type="number" step="0.01" placeholder="Enter quantity" v-model="assetData.quantity" required>
                </div>
                <div class="input-group">
                    <label>Price per share</label>
                    <input type="number" step="0.01" placeholder="Enter price per share" v-model="assetData.price" required>
                </div>
                <div class="text-center">
                    <button class="track-btn mt-10">Add asset</button>
                </div>
            </form>
        </Modal>
        <div class="rounded overflow-hidden shadow-lg" :class="[portfolio.profit > 0 ? 'shadow-green-600' : 'shadow-red-500']" v-if="portfolio.assets && portfolio.assets.length">
            <div class="px-6 py-4 flex flex-col">
                <div class="flex justify-between mb-2"><span class="dark:text-white">Portfolio</span> <span class="badge">{{  portfolio.name }}</span></div>
                <div class="flex justify-between mb-2"><span class="dark:text-white">Equity</span> <span class="badge">${{ portfolio.equity.toFixed(2) }}</span></div>
                <div class="flex justify-between mb-2"><span class="dark:text-white">Profit</span> <span class="badge" :class="[portfolio.profit > 0 ? 'green' : 'red']">{{ formatAmount(portfolio.profit) }}</span></div>
                <div class="flex justify-between"><span class="dark:text-white">ROI</span> <span class="badge" :class="[portfolio.roi > 0 ? 'green' : 'red']">{{ portfolio.roi.toFixed(2) }}%</span></div>
            </div>
        </div>
        <table class="table-auto w-full mt-10" v-if="portfolio.assets && portfolio.assets.length">
            <thead>
                <tr>
                    <th class="dark:text-white">Asset</th>
                    <th class="text-right dark:text-white">Holdings</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asset in portfolio.assets">
                    <td>
                        <ul>
                            <li class="dark:text-white">{{ asset.ticker.ticker }}</li>
                            <li class="text-xs dark:text-white">{{ asset.quantity }} shares</li>
                        </ul>
                    </td>
                    <td class="text-right">
                        <ul>
                            <li class="dark:text-white">${{ asset.position_worth }}</li>
                            <li class="text-xs">
                                <span :class="[asset.profit > 0 ? 'green' : 'red']">{{ formatAmount(asset.profit) }}</span><span class="gray mx-1">|</span>
                                <span :class="[asset.roi > 0 ? 'green' : 'red']">{{ asset.roi.toFixed(2) }}%</span>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="fixed bottom-28 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <button v-if="Object.keys(portfolio).length === 0" class="track-btn text-xl" @click="showPortfolioModal = true">Add new porftolio</button>
            <button v-else class="track-btn text-xl" @click="showAssetModal = true">Add asset</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '../components/Modal.vue'
export default {
    data() {
        return {
            showPortfolioModal: false,
            showAssetModal: false,
            name: '',
            assetData: {
                portfolio_id: '',
                ticker_id: '',
                asset: '',
                quantity: '',
                price: ''
            }
        }
    },
    created() {
        const portfolio_id = localStorage.getItem('portfolio_id')
        if (portfolio_id != null) {
            this.updatePortfolio(portfolio_id).then(() => {
                this.getPortfolio()   
            })
        }
    },
    methods: {
        closePortfolioModal() {
            this.showPortfolioModal = false
        },
        closeAssetModal() {
            this.showAssetModal = false
            this.assetData = {}
        },
        itemProjection(item) {
            return item.name
        },
        selectItemEventHandler(item) {
            this.assetData.ticker_id = item.id
        },
        formatAmount(amount) {
            if (amount) {
                if (amount.toString().substring(0, 1) === '-') {
                    return '-$' + amount.toFixed(2).toString().substring(1)
                }
            }
            return '$' + amount.toFixed(2)
        },
        ...mapActions(['storePortfolio', 'getPortfolio', 'searchTicker', 'storeAsset', 'getTickerId', 'updatePortfolio'])
    },
    computed: {
        ...mapGetters(['portfolio', 'tickers'])
    },
    components: {
        Modal: Modal
    },
}
</script>
