<template>
  <div class="space-y-4">
    <!-- Practice Button -->
    <TfsButton
      v-if="!isMobile || textToSpeechStatus === 'is-enabled'"
      size="sm"
      variant="primary"
      :icon="currentIcon"
      :icon-animation="isListening ? 'animate-bounce' : ''"
      :icon-size="isListening ? 'text-xl' : ''"
      :class="buttonClasses"
      :is-clickable="!isListening"
      @click="!isListening && togglePractice()"
      :disabled="isProcessing"
    >
      {{ buttonText }}
    </TfsButton>

    <!-- Results Modal -->
    <TfsModal
      :is-open="showResults"
      title="Resultados de Pronunciación"
      @close="closeResults"
    >
      <div class="space-y-4">
        <div class="text-center">
          <div class="text-4xl font-bold" :class="accuracyColorClass">
            {{ Math.round(results.similarity) }}%
          </div>
          <p class="text-gray-600 mt-2">Similitud con la pronunciación correcta</p>
          
          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div 
              class="h-2.5 rounded-full transition-all duration-500" 
              :class="accuracyColorClass"
              :style="{ width: `${Math.round(results.similarity)}%` }"
            ></div>
          </div>
        </div>

        <div class="space-y-2">
          <div>
            <span class="font-medium">You said:</span>
            <p class="mt-1 p-2 bg-gray-50 rounded">{{ results.spokenText }}</p>
          </div>
          <div>
            <span class="font-medium">Expected:</span>
            <p class="mt-1 p-2 bg-gray-50 rounded">{{ results.expectedText }}</p>
          </div>
        </div>

        <div class="mt-4">
          <TfsButton
            @click="startPractice"
            variant="primary"
          >
            Try Again
          </TfsButton>
        </div>
      </div>
    </TfsModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCookieStore } from '~/stores/cookies'

const props = defineProps({
  exercise: {
    type: Object,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
})

const nuxtApp = useNuxtApp()
const { $speechComparison, $logger } = nuxtApp
const { isMobile } = useUi()

const cookieStore = useCookieStore()
const textToSpeechStatus = cookieStore.get('text-to-speech')

const isProcessing = ref(false)
const isListening = ref(false)
const showResults = ref(false)
const results = ref({
  spokenText: '',
  expectedText: '',
  similarity: 0,
  confidence: 0,
})

// Computed properties for button
const currentIcon = computed(() => {
  if (isListening.value) return 'mdi-microphone'
  return 'mdi-account-voice'
})

const buttonText = computed(() => {
  if (isListening.value) return 'Escuchando tu voz...'
  return 'Practicar Pronunciación'
})

const buttonClasses = computed(() => ({
  'animate-pulse bg-red-500 ring-4 ring-red-200': isListening.value,
}))

async function startPractice() {
  try {
    isListening.value = true
    
    const result = await $speechComparison.startListening({
      expectedText: props.text,
      onStart: () => {
        isListening.value = true
      },
      onEnd: () => {
        isListening.value = false
      },
      onError: (error) => {
        $logger.error('Speech recognition error:', error)
      }
    })
    
    results.value = result
    showResults.value = true
  } catch (error) {
    $logger.error('Error:', error)
  } finally {
    isProcessing.value = false
    isListening.value = false
  }
}

async function togglePractice() {
  if (isProcessing.value) return
  
  if (isListening.value) {
    $speechComparison.stopListening()
  } else {
    await startPractice()
  }
}

const accuracyColorClass = computed(() => {
  const similarity = results.value.similarity
  if (similarity >= 90) return 'text-green-500'
  if (similarity >= 70) return 'text-yellow-500'
  return 'text-red-500'
})

function closeResults() {
  showResults.value = false
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.ring-4 {
  animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  80% { box-shadow: 0 0 0 14px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}
</style>
