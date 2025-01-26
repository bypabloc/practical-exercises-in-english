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
              <!-- Question Text Split -->
              <p class="text-lg">
                <span>{{ getBeforeBlanks(exercise.question) }}</span>
                <span 
                  :class="{
                    'text-green-600 font-medium': showResults && isCorrect(index),
                    'text-red-600 font-medium': showResults && !isCorrect(index),
                    'text-blue-600 font-medium': !showResults && userAnswers[index]
                  }"
                >{{ userAnswers[index] || '_____' }}</span>
                <span>{{ getAfterBlanks(exercise.question) }}</span>
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
                  placeholder="Type your answer here"
                />
              </div>
            </div>

            <!-- Results Section (shown after validation) -->
            <div v-if="showResults" class="space-y-3">
              <div class="flex items-center gap-2">
                <!-- Correct/Incorrect Indicator -->
                <div v-if="isCorrect(index)" class="text-green-500 flex items-center gap-2">
                  <i class="i-mdi-check-circle text-xl"></i>
                  <span>Correct!</span>
                </div>
                <div v-else class="space-y-2">
                  <span class="text-red-500 flex items-center gap-2">
                    <i class="i-mdi-close-circle text-xl"></i>
                    <span>Incorrect</span>
                  </span>
                  <p class="text-lg text-gray-800">
                    Correct answer: "{{ exercise.answer }}"
                  </p>
                  <p class="text-lg text-gray-800">
                    Complete sentence: "{{ getCompleteSentence(exercise) }}"
                  </p>
                </div>
              </div>

              <!-- Explanation Section -->
              <div v-if="exercise.explanation" class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-700 mb-2">Explicación:</h4>
                <p class="text-gray-600">{{ exercise.explanation }}</p>
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

              <!-- Practice Button -->
              <TfsButtonSpeak
                :text="getCompleteSentence(exercise)"
              />
              <TfsButtonPractice :text="exercise.answer" />
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <TfsButton
          :disabled="showResults || !allFieldsFilled"
          @click="validateAnswers"
          :class="{
            'opacity-50': !allFieldsFilled && !showResults
          }"
        >
          {{ showResults ? 'Completed' : 'Check Answers' }}
        </TfsButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  exercises: {
    type: Array,
    required: true
  }
});

// Component state
const userAnswers = ref([]);
const showResults = ref(false);
const selectedExercises = ref([]);

// Select 10 random exercises on mount
onMounted(() => {
  const shuffled = [...props.exercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  selectedExercises.value = shuffled;
  userAnswers.value = Array(shuffled.length).fill('');
});

const allFieldsFilled = computed(() => {
  return userAnswers.value.every(answer => answer?.trim() !== '');
});

// Helper functions to split question around blank
const getBeforeBlanks = (question) => {
  return question.split('{_____}')[0];
};

const getAfterBlanks = (question) => {
  return question.split('{_____}')[1];
};

// Get complete sentence with answer filled in
const getCompleteSentence = (exercise) => {
  return exercise.question.replace('{_____}', exercise.answer);
};

// Check if an answer is correct
const isCorrect = (index) => {
  if (!userAnswers.value[index]) return false;
  return userAnswers.value[index].toLowerCase().trim() === 
    selectedExercises.value[index].answer.toLowerCase().trim();
};

// Validate all answers
const validateAnswers = () => {
  if (allFieldsFilled.value) {
    showResults.value = true;
  }
};
</script>
