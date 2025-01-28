<template>
  <TfsButton
    v-if="!isMobile || textToSpeechStatus === 'is-enabled'"
    size="sm"
    :variant="!isPlaying ? 'primary' : 'danger'"
    icon="mdi-speakerphone"
    :disabled="isDisabled"
		:is-clickable="!isPlaying"
    @click="speak"
  >
    <div
			v-if="isPlaying"
			class="flex items-center space-x-2"
		>
      <i class="text-xl animate-bounce"></i>
      <span class="text-sm">Speaking...</span>
    </div>
		<div
			v-else
		>
			<span v-if="label">{{ label }}</span>
			<span v-else>Speak</span>
		</div>
  </TfsButton>
</template>

<script setup>
import { useCookieStore } from '~/stores/cookies'

const props = defineProps({
	text: {
		type: String,
		required: true,
	},
	isDisabled: {
		type: Boolean,
		default: false,
	},
	label: {
		type: String,
		default: '',
	},
	pitch: {
		type: Number,
		default: 1,
	},
	rate: {
		type: Number,
		default: 0.7,
	},
})

const { isMobile } = useUi()
const { $textToSpeech, $logger } = useNuxtApp()

const isPlaying = ref(false)

const cookieStore = useCookieStore()
const textToSpeechStatus = cookieStore.get('text-to-speech')

const speak = async () => {
	console.log('Speaking text:', props.text)
	console.log('$textToSpeech', $textToSpeech)
	isPlaying.value = true
	try {
		await $textToSpeech.speak(props.text, {
			rate: props.rate,
			pitch: props.pitch,
		})
	} catch (error) {
		$logger.error('Error speaking text', error)
	} finally {
		isPlaying.value = false
	}
	isPlaying.value = false
}
</script>
