<template>
	<div>
		<Header></Header>
		<div class="container mx-auto mb-36 p-10">
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