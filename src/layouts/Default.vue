<template>
	<div>
		<Header></Header>
		<div class="container mx-auto max-h-screen p-10">
			<router-view />
		</div>
	</div>
</template>

<script>
import Header from '../components/Menu.vue'

export default {
	components: {
		Header: Header
	}
}
</script>