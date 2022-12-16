<template>
	<div>
		<Header></Header>
		<div class="container mx-auto max-h-screen py-10 px-20">
			<router-view />
		</div>
	</div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	components: {
		Header: Header
	}
}
</script>