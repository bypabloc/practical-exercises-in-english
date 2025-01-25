<template>
  <TfsButton
    v-if="!isDisabled"
    size="sm"
    variant="primary"
    icon="i-mdi-volume-high"
    @click="speak"
  >
    {{ label || 'Practice Pronunciation' }}
  </TfsButton>
</template>

<script setup>
import { useCookieStore } from '~/stores/cookies'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
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
const textToSpeech = cookieStore.get('text-to-speech')

const isDisabled = computed(() => {
  return textToSpeech === 'is-disabled'
})

const speak = () => {
  $textToSpeech.speak(props.text, {
    rate: props.rate,
    voice: props.voice
  })
}
</script>
