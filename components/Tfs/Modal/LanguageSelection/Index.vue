<template>
  <TfsModal 
    :is-open="isOpen" 
    title="Available Speech Voices"
    size="lg"
    @close="$emit('close')"
  >
    <template #default>
      <!-- Voice Selection -->
      <div class="space-y-2">
        <div 
          v-for="(voice, index) in availableVoices" 
          :key="index" 
          class="bg-gray-100 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors"
          @click="selectVoice(voice)"
        >
          <div>
            <p class="font-medium text-gray-800">{{ voice.name }}</p>
            <p class="text-sm text-gray-600">{{ voice.lang }}</p>
          </div>
          <input 
            type="radio" 
            :checked="selectedVoice === voice" 
            class="form-radio text-blue-500"
          />
        </div>
      </div>

      <!-- Test Voice Input -->
      <div class="mt-4 space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Test Voice Pronunciation
        </label>
        <input 
          v-model="testText" 
          type="text" 
          placeholder="Enter text to test pronunciation" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between w-full">
        <button
          @click="testVoicePronunciation"
          :disabled="!testText || !selectedVoice"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-200 disabled:cursor-not-allowed"
        >
          Test Pronunciation
        </button>
        <button 
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </template>
  </TfsModal>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const availableVoices = ref([])
const selectedVoice = ref(null)
const testText = ref('')

const nuxtApp = useNuxtApp()
const { $textToSpeech } = nuxtApp

const selectVoice = (voice) => {
  selectedVoice.value = voice
}

const testVoicePronunciation = () => {
  if (selectedVoice.value && testText.value) {
    $textToSpeech.speak(testText.value, { 
      rate: 0.7,
      voice: selectedVoice.value.originalVoice
    })
  }
}

onMounted(() => {
  // Get available voices from speech synthesis
  const voices = window.speechSynthesis.getVoices()
  availableVoices.value = voices.map(voice => ({
    name: voice.name,
    lang: voice.lang,
    originalVoice: voice
  }))
})
</script>
