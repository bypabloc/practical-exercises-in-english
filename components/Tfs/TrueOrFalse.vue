<template>
  <div class="max-w-4xl mx-auto p-6">
    <form @submit.prevent="validateAnswers" class="space-y-8">
      <!-- Exercise List -->
      <div v-for="(exercise, index) in selectedExercises" :key="index" class="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div class="flex items-start gap-4">
          <!-- Exercise Number -->
          <span class="font-bold text-gray-600">{{ index + 1 }}.</span>
          
          <!-- Exercise Content -->
          <div class="flex-1 space-y-4">
            <!-- Question -->
            <p class="text-lg text-gray-800">{{ exercise.sentence }}</p>
            
            <!-- True/False Options -->
            <div class="space-y-2">
              <div class="flex items-center gap-4">
                <div v-for="option in [true, false]" :key="option"
                     class="flex items-center gap-3">
                  <input
                    type="radio"
                    :id="`question-${index}-option-${option}`"
                    :name="`question-${index}`"
                    :value="option"
                    v-model="userAnswers[index]"
                    :disabled="showResults"
                    class="w-4 h-4 text-blue-500 focus:ring-blue-400"
                  />
                  <label 
                    :for="`question-${index}-option-${option}`"
                    :class="{
                      'text-green-600 font-medium': showResults && option === exercise.isTrue,
                      'text-red-600 line-through': showResults && option !== exercise.isTrue && userAnswers[index] === option,
                      'text-gray-700': !showResults || (showResults && option !== exercise.isTrue && userAnswers[index] !== option)
                    }"
                    class="cursor-pointer p-2 rounded hover:bg-gray-50"
                  >
                    {{ option ? 'True' : 'False' }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Results Section -->
            <div v-if="showResults" class="space-y-4">
              <!-- Feedback -->
              <div class="flex items-center gap-2">
                <div v-if="isCorrect(index)" class="text-green-500 flex items-center gap-2">
                  <i class="i-mdi-check-circle text-xl"></i>
                  <span>¡Correcto!</span>
                </div>
                <div v-else class="text-red-500 flex items-center gap-2">
                  <i class="i-mdi-close-circle text-xl"></i>
                  <span>Incorrecto</span>
                </div>
              </div>

              <!-- Explanation -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-700 mb-2">Explicación:</h4>
                <p class="text-gray-600">{{ exercise.explanation }}</p>
              </div>

              <!-- Translation & Pronunciation -->
              <div class="text-sm text-gray-600 space-y-1 pl-2 border-l-4 border-gray-200">
                <p class="flex gap-2">
                  <span class="font-medium">Translation:</span>
                  <span>{{ exercise.translation }}</span>
                </p>
                <div class="flex items-center gap-2">
                  <p class="flex gap-2">
                    <span class="font-medium">Pronunciation:</span>
                    <span>{{ exercise.pronunciation }}</span>
                  </p>
                  <TfsButtonSpeak
                    :text="exercise.sentence"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="px-6 py-3 rounded-lg transition-colors text-lg font-medium"
          :class="[
            allQuestionsAnswered ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-blue-200 text-gray-600 cursor-default'
          ]"
          :disabled="showResults || !allQuestionsAnswered"
        >
          {{ showResults ? 'Completed' : 'Check Answers' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  exercises: {
    type: Array,
    required: true
  }
});

const nuxtApp = useNuxtApp();
const { $textToSpeech } = nuxtApp;

// Component state
const selectedExercises = ref([]);
const userAnswers = ref([]);
const showResults = ref(false);

// Select 10 random exercises on mount
onMounted(() => {
  const shuffled = [...props.exercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  selectedExercises.value = shuffled;
  userAnswers.value = Array(shuffled.length).fill(null);
});

// Check if all questions have been answered
const allQuestionsAnswered = computed(() => {
  return userAnswers.value.every(answer => answer !== null);
});

// Check if an answer is correct
const isCorrect = (index) => {
  return userAnswers.value[index] === selectedExercises.value[index].isTrue;
};

// Get user's score
const getScore = () => {
  return selectedExercises.value.reduce((score, _, index) => {
    return score + (isCorrect(index) ? 1 : 0);
  }, 0);
};

// Validate all answers
const validateAnswers = () => {
  if (!allQuestionsAnswered.value) return;
  showResults.value = true;
};

// Practice pronunciation
const practicePronunciation = (exercise) => {
  $textToSpeech.speak(exercise.sentence, { rate: 0.7 });
};
</script>
