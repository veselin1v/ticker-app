<template>
	<div class="modal" @mousedown.self="$emit('close-modal')">
		<Transition appear
			enter-active-class="duration-100 ease-out"
			enter-from-class="scale-95 opacity-0"
			leave-active-class="duration-50 ease-in"
			leave-to-class="scale-0 opacity-0"
			>
			<div class="max-h-[95%] max-w-[90%] dark:dark overflow-auto rounded-lg">
				<div class="flex items-start justify-between px-5 pt-5 pb-3 dark:dark rounded-t-xl border-b">
					<div class="pr-5 ">
						<h3 v-if="title" class="text-xl text-white font-semibold">
							{{ title }}
						</h3>
						<div v-if="subtitle" class="max-w-[600px] text-sm text-white">
							{{ subtitle }}
						</div>
					</div>
					<button @click="$emit('close-modal')">
						<icon-close />
					</button>
				</div>
				<div class="p-5">
					<slot></slot>
				</div>
			</div>
		</Transition>
	</div>
</template>
<script>
export default {
	props: [
		'title',
		'subtitle',
	],
	created() {
		const onEscape = (e) => {
				if (e.keyCode === 27) {
					this.$emit('close-modal')
				}
			}
		document.addEventListener('keydown', onEscape)
	}
}
</script>