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
            <form @submit.prevent="storeAsset(assetData);closeAssetModal()">
                <!-- <div class="input-group">
                    <label>Asset ticker or name</label>
                    <input type="text" placeholder="Enter asset ticker or name" v-model="assetData.asset" required>
                </div>
                <div class="input-group">
                    <label>Price per share</label>
                    <input type="number" placeholder="Enter price per share" v-model="assetData.price" required>
                </div> -->
                <vue3-simple-typeahead
                    id="typeahead_id"
                    placeholder="Start writing..."
                    :items="['One','Two','Three']"
                    :minInputLength="1"
                    :itemProjection="itemProjectionFunction"
                    @selectItem="selectItemEventHandler"
                    @onInput="onInputEventHandler"
                    @onFocus="onFocusEventHandler"
                    @onBlur="onBlurEventHandler"
                >
                </vue3-simple-typeahead>
                <div class="text-center">
                    <button class="track-btn mt-10">Add asset</button>
                </div>
            </form>
        </Modal>
        <div class="flex flex-col">
            <span>Name: {{ portfolios.name }}</span>
            <span>Balance: {{ portfolios.balance }}</span>
            <button class="track-btn" @click="showAssetModal = true">Add asset</button>
        </div>
        <div class="text-center absolute bottom-20">
            <button class="track-btn text-2xl" @click="showPortfolioModal = true">Add new porftolio</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '../../components/Modal.vue'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS
export default {
    data() {
        return {
            showPortfolioModal: false,
            showAssetModal: false,
            name: '',
            assetData: {
                asset: '',
                price: ''
            }
        }
    },
    created() {
        this.getPortfolios()
    },
    methods: {
        closePortfolioModal() {
            this.showPortfolioModal = false
        },
        closeAssetModal() {
            this.showAssetModal = false
        },
        ...mapActions(['storePortfolio', 'getPortfolios'])
    },
    computed: {
        ...mapGetters(['portfolios'])
    },
    components: {
        Modal: Modal,
        SimpleTypeahead: SimpleTypeahead
    },
}
</script>
