<template>
	<section v-if="user" class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow py-4 px-7 border-t dark:dark dark:text-white">
		<div id="tabs" class="flex justify-between itemst-center">
            <router-link :to="{ name: 'dashboard'}" class="menu-link">
                <icon-dashboard class="w-6" :class="[$route.name == 'dashboard' ? 'fill-orange-500' : 'fill-white']" />
                <span class="text-xs mt-2" :class="[$route.name == 'dashboard' ? 'text-orange-500' : 'text-white']">Dashboard</span>
            </router-link>
            <router-link :to="{ name: 'portfolio'}" class="menu-link">
                <icon-wallet class="w-6" :class="[$route.name == 'portfolio' ? 'fill-orange-500' : 'fill-white']" />
                <span class="text-xs mt-2" :class="[$route.name == 'portfolio' ? 'text-orange-500' : 'text-white']">Portfolio</span>
            </router-link>
            <router-link :to="{ name: 'dividends'}" class="menu-link">
                <icon-funds class="w-6" :class="[$route.name == 'dividends' ? 'fill-orange-500' : 'fill-white']" />
                <span class="text-xs mt-2" :class="[$route.name == 'dividends' ? 'text-orange-500' : 'text-white']">Dividends</span>
            </router-link>
            <router-link :to="{ name: 'account'}" class="menu-link">
                <icon-account class="w-6" :class="[$route.name == 'account' ? 'fill-orange-500' : 'fill-white']" />
                <span class="text-xs mt-2" :class="[$route.name == 'account' ? 'text-orange-500' : 'text-white']">Account</span>
            </router-link>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: localStorage.getItem('user')
        }
    },
    watch:{
        $route (to, from) {
            this.user = localStorage.getItem('user')
        }
    }
}
</script>
