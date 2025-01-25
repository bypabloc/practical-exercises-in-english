<template>
  <TfsButton
    v-if="!isMobile || textToSpeechStatus === 'is-enabled'"
    size="sm"
    variant="primary"
    icon="mdi-speakerphone"
    :disabled="isDisabled"
    @click="speak"
  />
</template>

<script setup>
import { useCookieStore } from '~/stores/cookies'
const { isMobile } = useUi()

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  pitch: {
    type: Number,
    default: 1
  },
  rate: {
    type: Number,
    default: 0.7
  },
  voice: {
    type: Object,
    default: null
  }
})

const nuxtApp = useNuxtApp()
const { $textToSpeech } = nuxtApp

const cookieStore = useCookieStore()
const textToSpeechStatus = cookieStore.get('text-to-speech')

const speak = () => {
  $textToSpeech.speak(props.text, {
    rate: props.rate,
    pitch: props.pitch,
    voice: props.voice
  })
}
</script>
