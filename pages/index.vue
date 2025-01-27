<template>
  <div class="flex flex-col items-center justify-center p-6">
    <h1 class="text-3xl font-bold mb-10">English Practice Exercises</h1>
    
    <div class="flex flex-col gap-4 w-full max-w-md">
      <TfsButton
        v-for="difficulty in difficulties"
        :key="difficulty.name"
        @click="difficulty.isActive ? navigateToLevel(difficulty.route) : null"
        :variant="difficulty.isActive ? 'primary' : 'secondary'"
        :disabled="!difficulty.isActive"
        class="p-4 text-lg rounded-lg"
      >
        {{ difficulty.name }}
      </TfsButton>

      <!-- Voice Selection Button -->
      <TfsButton
        v-if="!isMobile || textToSpeechStatus === 'is-enabled'"
        @click="openVoiceModal"
        class="p-4 text-lg rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        Test Text-to-Speech Voices
      </TfsButton>
    </div>

    <!-- Voice Selection Modal -->
    <TfsModalLanguageSelection
      v-if="!isMobile || textToSpeechStatus === 'is-enabled'"
      :is-open="isVoiceModalOpen" 
      @close="closeVoiceModal"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useExerciseStore } from '~/stores/exercises'
import { useCookieStore } from '~/stores/cookies'
const { isMobile } = useUi()

const exerciseStore = useExerciseStore()
const router = useRouter()

const cookieStore = useCookieStore()

const textToSpeechStatus = cookieStore.get('text-to-speech')

const isVoiceModalOpen = ref(false)

const difficulties = computed(() => {
	const difficulties = Object.keys(exerciseStore.difficulties).map(
		difficulty => {
			return {
				name: exerciseStore.difficulties[difficulty].label,
				route: `/${difficulty}`,
				order: exerciseStore.difficulties[difficulty].order,
				isActive: exerciseStore.difficulties[difficulty].isActive,
			}
		},
	)
	return difficulties.sort((a, b) => a.order - b.order)
})

const navigateToLevel = route => {
	router.push(route)
}

const openVoiceModal = () => {
	isVoiceModalOpen.value = true
}

const closeVoiceModal = () => {
	isVoiceModalOpen.value = false
}
</script>
