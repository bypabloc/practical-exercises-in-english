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
            <!-- Question with Dynamic Answer -->
            <div class="space-y-3">
              <!-- Question Text -->
              <p class="text-lg">
                {{ exercise.question.split('{_____}')[0] }}
                <span 
                  :class="{
                    'text-green-600 font-medium': showResults && isCorrect(index),
                    'text-red-600 font-medium': showResults && !isCorrect(index),
                    'text-blue-600 font-medium': !showResults && userAnswers[index]
                  }"
                >
                  {{ userAnswers[index] || '________' }}
                </span>
                {{ exercise.question.split('{_____}')[1] }}
                <span class="text-sm text-gray-500 ml-2">({{ exercise.clue }})</span>
              </p>
              
              <!-- Answer Input -->
              <div class="flex items-center gap-2">
                <input 
                  type="text" 
                  v-model="userAnswers[index]" 
                  class="w-48 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{
                    'border-green-500 bg-green-50': showResults && isCorrect(index),
                    'border-red-500 bg-red-50': showResults && !isCorrect(index)
                  }"
                  :disabled="showResults"
                  placeholder="Type the answer here"
                />
              </div>
            </div>

            <!-- Results Section (shown after validation) -->
            <div v-if="showResults" class="space-y-3">
              <div class="flex items-center gap-2">
                <!-- Correct Answer Icon -->
                <span v-if="isCorrect(index)" class="text-green-500 flex items-center gap-2">
                  <i class="i-mdi-check-circle text-xl"></i>
                  <span>Correct!</span>
                </span>
                
                <!-- Incorrect Answer Icon & Full Correct Sentence -->
                <div v-else class="space-y-2">
                  <span class="text-red-500 flex items-center gap-2">
                    <i class="i-mdi-close-circle text-xl"></i>
                    <span>Incorrect</span>
                  </span>
                  <p class="text-lg text-gray-800">
                    Correct sentence: "{{ getFullSentence(exercise) }}"
                  </p>
                </div>
              </div>

              <!-- Translation & Pronunciation -->
              <div class="text-sm text-gray-600 space-y-1 pl-2 border-l-4 border-gray-200">
                <p class="flex gap-2">
                  <span class="font-medium">Translation:</span>
                  <span>{{ exercise.translation }}</span>
                </p>
                <p class="flex gap-2">
                  <span class="font-medium">Pronunciation:</span>
                  <span>{{ exercise.pronunciation }}</span>
                </p>
              </div>

              <!-- Practice Button (shown for all answers after validation) -->
              <button
                type="button"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                @click="practicePronunciation(index)"
              >
                Practice Pronunciation
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
          :disabled="showResults"
        >
          {{ showResults ? 'Completed' : 'Check Answers' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useExerciseStore } from '~/stores/exercises';

const nuxtApp = useNuxtApp();

const { $textToSpeech } = nuxtApp;

// Store initialization
const store = useExerciseStore();
const exercises = computed(() => 
  store.exercises.basic.items['complete-with-the-correct-verb'].items
);

// Component state
const userAnswers = ref([]);
const showResults = ref(false);
const selectedExercises = ref([]);

// Select 10 random exercises
onMounted(() => {
  const shuffled = [...exercises.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  selectedExercises.value = shuffled;
  userAnswers.value = Array.from({ length: 10 }, () => '');
});

// Check if an answer is correct
const isCorrect = (index) => {
  return userAnswers.value[index].toLowerCase().trim() === 
    selectedExercises.value[index].answer.toLowerCase().trim();
};

// Get full sentence with correct answer
const getFullSentence = (exercise) => {
  return exercise.question.replace('{_____}', exercise.answer);
};

// Validate all answers
const validateAnswers = () => {
  showResults.value = true;
};

const synth = window.speechSynthesis;
let voices = [];
PopulateVoices();
if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = PopulateVoices;
}
function PopulateVoices(){
    voices = synth.getVoices();
    voices.forEach((item, index) => console.log(item.name, index));
}

// Practice pronunciation of the exercise
const practicePronunciation = (index) => {
  const exercise = selectedExercises.value[index];
  $textToSpeech.speak(exercise.pronunciation);
};
</script>
