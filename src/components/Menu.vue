<template>
	<section v-if="user" class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow py-4 px-7 border-t dark:dark dark:text-white">
		<div id="tabs" class="flex justify-between itemst-center">
            <router-link :to="{ name: 'dashboard'}" class="menu-link">
                <icon-dashboard class="w-6 dark:fill-white" />
                <span class="text-xs mt-2">Dashboard</span>
            </router-link>
            <router-link :to="{ name: 'portfolio'}" class="menu-link">
                <icon-chart class="w-6 dark:fill-white" />
                <span class="text-xs mt-2">Portfolio</span>
            </router-link>
            <router-link :to="{ name: 'dividendIndex'}" class="menu-link">
                <icon-funds class="w-6 dark:fill-white" />
                <span class="text-xs mt-2">Dividends</span>
            </router-link>
            <router-link :to="{ name: 'account'}" class="menu-link">
                <icon-account class="w-6 dark:fill-white" />
                <span class="text-xs mt-2">Account</span>
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
