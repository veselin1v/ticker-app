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
        <div class="text-center">
            <h1 class="text-brown text-xl">{{ portfolio.name }}</h1>
        </div>
        <div class="dark:text-white flex justify-between border-y py-4 my-8" v-if="portfolio.assets && portfolio.assets.length">
            <div class="w-full">
                <div class="flex justify-between">
                    <span class="mr-3">Equity:</span>
                    <span>${{ portfolio.equity }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="mr-3">Invested:</span>
                    <span>${{ portfolio.invested }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="mr-3">Profit:</span>
                    <span :class="[portfolio.profit > 0 ? 'green' : 'red']">{{ formatAmount(portfolio.profit) }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="mr-3">ROI:</span>
                    <span :class="[portfolio.roi > 0 ? 'green' : 'red']">{{ portfolio.roi != null ? portfolio.roi.toFixed(2) : null }}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="mr-3">Annual dividend:</span>
                    <span>${{ portfolio.annual_dividend }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="mr-3">Dividend yield:</span>
                    <span>{{ portfolio.dividend_yield }}%</span>
                </div>
            </div>
        </div>
        <table class="table-auto w-full" v-if="portfolio.assets && portfolio.assets.length">
            <thead>
                <tr>
                    <th class="dark:text-white">
                        <div class="flex">
                            <span>Asset</span>
                            <icon-filter class="w-5 dark:fill-white" @click="sortByAsset();changeSortTickerDirection()"/>
                        </div>
                    </th>
                    <th class="dark:text-white">
                        <div class="flex justify-end">
                            <span>Holdings</span>
                            <icon-filter class="w-5 dark:fill-white" @click="sortByHolding();changeSortHoldingDirection()"/>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asset in portfolio.assets" :key="asset.id" @click="$router.push({ name: 'assets', params: { id: asset.id } })">
                    <td>
                        <ul>
                            <li class="dark:text-white">{{ asset.ticker.ticker }} <span class="text-[10px]" v-if="asset.ticker.dividend_yield">(DY: {{ asset.ticker.dividend_yield.toFixed(2) }} %)</span></li>
                            <li class="text-xs dark:text-white">{{ asset.quantity }} shares</li>
                        </ul>
                    </td>
                    <td class="text-right">
                        <ul>
                            <li class="dark:text-white">${{ asset.position_worth.toFixed(2) }}</li>
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
            <button v-if="Object.keys(portfolio).length === 0" class="track-btn text-lg" @click="showPortfolioModal = true">Add new porftolio</button>
            <button v-else class="track-btn text-lg" @click="showAssetModal = true">Add asset</button>
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
            },
            sortTicker: 'asc',
            sortHolding: 'desc'
        }
    },
    created() {
        const portfolio_id = localStorage.getItem('portfolio_id')
        if (portfolio_id != null) {
            this.updatePortfolio(portfolio_id).then(() => {
                this.getPortfolio().then(() => {
                    const sortBy = localStorage.getItem('sortBy')
                    if (sortBy != null) {
                        if (sortBy == 'asset') {
                            this.sortByAsset()
                            this.changeSortTickerDirection()
                        } else {
                            this.sortByHolding()
                            this.changeSortHoldingDirection()
                        }
                    }
                })
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
                return '$' + amount.toFixed(2)
            }
        },
        sortByAsset() {
            if (this.portfolio.assets && this.portfolio.assets.length) {
                this.portfolio.assets.sort(function(a,b) {
                if (this.sortTicker == 'asc') {
                    return ( ( a.ticker.ticker == b.ticker.ticker ) ? 0 : ( ( a.ticker.ticker > b.ticker.ticker ) ? 1 : -1 ) )
                }
                if (this.sortTicker == 'desc') {
                    return ( ( a.ticker.ticker == b.ticker.ticker ) ? 0 : ( ( a.ticker.ticker < b.ticker.ticker ) ? 1 : -1 ) )
                }
                }.bind(this))
                localStorage.setItem('sortBy', 'asset')
            }
        },
        sortByHolding() {
            this.portfolio.assets.sort(function(a,b) {
                if (this.sortHolding == 'asc') {
                    return ( ( a.position_worth == b.position_worth ) ? 0 : ( ( a.position_worth > b.position_worth ) ? 1 : -1 ) )
                }
                if (this.sortHolding == 'desc') {
                    return ( ( a.position_worth == b.position_worth ) ? 0 : ( ( a.position_worth < b.position_worth ) ? 1 : -1 ) )
                }
            }.bind(this))
            localStorage.setItem('sortBy', 'holding')
        },
        changeSortTickerDirection() {
            if (this.sortTicker == 'asc') {
                this.sortTicker = 'desc'
            } else {
                this.sortTicker = 'asc'
            }
        },
        changeSortHoldingDirection() {
            if (this.sortHolding == 'asc') {
                this.sortHolding = 'desc'
            } else {
                this.sortHolding = 'asc'
            }
        },
        sortByPrice() {
            console.log(this.portfolio.assets)
            this.portfolio.assets.sort(function (a, b) {
                if (a.position_worth < b.position_worth) {
                    return 1;
                }
                if (a.position_worth > b.position_worth) {
                    return -1;
                }
                return 0;
            });
        },
        ...mapActions(['storePortfolio', 'getPortfolio', 'searchTicker', 'storeAsset', 'getTickerId', 'updatePortfolio'])
    },
    computed: {
        ...mapGetters(['portfolio', 'tickers'])
    },
    components: {
        Modal: Modal
    }
}
</script>
