<template>
  <TfsModal 
    :is-open="isOpen" 
    title="Available Speech Voices"
    size="lg"
    @close="$emit('close')"
  >
    <template #default>
      <!-- Voice Selection -->
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Select Voice
          </label>
          <select 
            v-model="selectedVoice" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option 
              v-for="(voice, index) in processedVoices" 
              :key="index" 
              :value="voice"
            >
              {{ voice.name }} ({{ voice.lang }})
              {{ voice.localService ? '- Local' : '- Network' }}
              {{ voice.default ? '- Default' : '' }}
            </option>
          </select>
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
          
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label for="rate" class="block text-sm font-medium text-gray-700">Rate</label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                v-model.number="rate" 
                step="0.1" 
                id="rate" 
                class="w-full"
              />
              <div class="text-center text-sm text-gray-600">{{ rate }}</div>
            </div>
            <div>
              <label for="pitch" class="block text-sm font-medium text-gray-700">Pitch</label>
              <input 
                type="range" 
                min="0" 
                max="2" 
                v-model.number="pitch" 
                step="0.1" 
                id="pitch" 
                class="w-full"
              />
              <div class="text-center text-sm text-gray-600">{{ pitch }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between w-full">
        <TfsButtonSpeak
          label="Test Pronunciation"
          :text="testText"
          :rate="rate"
          :pitch="pitch"
          :is-disabled="!selectedVoice"
        />
        <TfsButton
          @click="$emit('close')"
          variant="ghost"
          :disabled="!selectedVoice"
        >
          Close
        </TfsButton>
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

const nuxtApp = useNuxtApp()
const { $textToSpeech } = nuxtApp

// Processed voices for display
const processedVoices = ref([])
const selectedVoice = ref(null)
const testText = ref('Nice to meet you')
const rate = ref(1)
const pitch = ref(1)

// Populate voices on component mount
onMounted(() => {
  // Get available voices 
  const voices = $textToSpeech.getVoices()
  processedVoices.value = voices

  // Auto-select first voice if available
  if (voices.length > 0) {
    selectedVoice.value = voices[0]
  }
})
</script>
