<template>
	<div class="alert" @mousedown.self="$emit('closeAlert')">
        <Transition
            appear
            enter-active-class="duration-500 ease-in-out"
            enter-from-class="scale-95"
            leave-active-class="duration-50 ease-in-out"
            leave-to-class="scale-0"
            >
            <div
                class="bg-white w-[90%] xl:w-auto border-t-8 shadow-lg py-5 px-10 flex flex-col items-center relative rounded-lg"
                :class="{
                    'border-red-500': type == 'error',
                    'border-lime-500': type == 'success',
                    'border-red-500': type == 'confirm',
                    'border-red-500': type == 'wait',
                    }"
                >
                <icon-close class="absolute top-2 right-3 w-3" @click="$emit('closeAlert')" v-if="type != 'wait'" />
                <icon-check-circle class="mt-5 mb-10 w-20 fill-lime-500" v-if="type == 'success'" />
                <icon-error-circle class="mt-5 mb-10 w-20 fill-red-500" v-if="type == 'error'" />
                <icon-attention-circle class="mt-5 mb-10 w-20 fill-red-500" v-if="type == 'confirm'" />
                <icon-spinner class="mt-5 mb-2 w-14 stroke-red-500" v-if="type == 'wait'" />
                <div
                    class="mb-5 w-[250px] xl:w-[350px] text-center text-gray-600"
                    :class="[type == 'wait' ? 'text-sm xl:text-base' : 'text-base xl:text-xl']"
                    >
                    {{ message }}
                </div>
                <div class="mt-5 flex flex-col space-y-3 xl:space-y-0 xl:flex-row xl:space-x-5" v-if="type != 'wait'">
                    <button
                        class="px-6 py-2 text-white text-sm xl:text-base transition-colors duration-600"
                        :class="{
                            'bg-red-500 hover:bg-red-600': type == 'error',
                            'bg-lime-500 hover:bg-lime-600': type == 'success',
                            'bg-red-500 hover:bg-red-600': type == 'confirm'
                            }"
                        @click="confirm"
                        >
                        <span>
                            {{ okButton }}
                        </span>
                    </button>
                    <button
                        class="px-6 py-2 text-white text-sm xl:text-base transition-colors duration-600 bg-gray-300 hover:bg-gray-400"
                        @click="cancel"
                        v-if="type == 'confirm'"
                        >
                        <span>
                            {{ cancelButton }}
                        </span>
                    </button>
                </div>
            </div>
        </Transition>
	</div>
</template>
<script>
export default {
    data() {
        return {
            type: '',
            message: '',
            okButton: 'OK',
            cancelButton: 'Cancel',
            resolvePromise: undefined,
            rejectPromise: undefined,
        }
    },
    props: ['alert'],
    methods: {
        confirm() {
            this.resolvePromise(true)
            this.reset()
        },
        cancel() {
            this.resolvePromise(false)
            this.reset()
        },
        reset() {
            this.$emit('closeAlert')
            this.okButton = 'OK'
            this.cancelButton = 'Cancel'
        }
    },
    created() {
        this.type = this.$props.alert.type
        if (this.type != 'wait') {
            this.message = this.$props.alert.message
        }
        new Promise((resolve, reject) => {
            this.resolvePromise = resolve
            this.rejectPromise = reject
        })
		const onEscape = (e) => {
				if (e.keyCode === 27) {
					this.$emit('closeAlert')
				}
			}
		document.addEventListener('keydown', onEscape)
	}
}
</script>