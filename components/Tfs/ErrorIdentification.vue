# components/Tfs/ErrorIdentification.vue
<template>
  <div class="max-w-4xl mx-auto p-6">
    <form @submit.prevent="validateAnswers" class="space-y-8">
      <!-- Instructions -->
      <div v-if="!showResults" class="bg-blue-50 p-4 rounded-lg">
        <p class="text-gray-700">
          Lee cada oración y selecciona la palabra o frase que contiene el error. Hay un solo error por oración.
        </p>
      </div>

      <!-- Exercise List -->
      <div class="space-y-8">
        <div v-for="(exercise, index) in selectedExercises" :key="index"
             class="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div class="flex items-start gap-4">
            <!-- Exercise Number -->
            <span class="font-bold text-gray-600 shrink-0">{{ index + 1 }}.</span>

            <!-- Exercise Content -->
            <div class="flex-1 space-y-4">
              <!-- Interactive Sentence -->
              <div class="space-y-3">
                <p class="text-lg">
                  <template v-for="wordObj in splitSentence(exercise.sentence)" :key="wordObj.id">
                    <span v-if="wordObj.selectable"
                      class="px-1 py-0.5 rounded cursor-pointer"
                      :class="{
                        'bg-blue-100 hover:bg-blue-200': !showResults && !isWordSelected(index, wordObj),
                        'bg-blue-500 text-white': !showResults && isWordSelected(index, wordObj),
                        'bg-green-500 text-white': showResults && wordObj.text === exercise.error_position,
                        'bg-red-500 text-white': showResults && isWordSelected(index, wordObj) && wordObj.text !== exercise.error_position,
                        'bg-transparent': showResults && !isWordSelected(index, wordObj) && wordObj.text !== exercise.error_position
                      }"
                      @click="!showResults && toggleWordSelection(index, wordObj)"
                    >
                      {{ wordObj.text }}
                    </span>
                    <span v-else>{{ wordObj.text }}</span>
                  </template>
                </p>
              </div>

              <!-- Results Section -->
              <div v-if="showResults" class="space-y-4">
                <!-- Feedback -->
                <div class="flex items-center gap-2">
                  <div v-if="isCorrect(index)" class="text-green-500 flex items-center gap-2">
                    <i class="i-mdi-check-circle text-xl"></i>
                    <span>¡Correcto! Identificaste el error correctamente.</span>
                  </div>
                  <div v-else class="text-red-500 flex items-center gap-2">
                    <i class="i-mdi-close-circle text-xl"></i>
                    <span>Incorrecto. El error está en "{{ exercise.error_position }}"</span>
                  </div>
                </div>

                <!-- Explanation -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-700 mb-2">Explicación:</h4>
                  <p class="text-gray-600">{{ exercise.explanation }}</p>
                  <div class="mt-3">
                    <p class="text-gray-700">
                      <span class="font-medium">Forma correcta:</span>
                      <span class="ml-2 text-green-600">{{ getSentenceWithCorrection(exercise) }}</span>
                    </p>
                  </div>
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
                    <!-- Practice Button -->
                    <button
                      type="button"
                      class="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      @click="practicePronunciation(exercise)"
                    >
                      Practice
                    </button>
                  </div>
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
            canSubmit ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-blue-200 text-gray-600 cursor-default',
          ]"
          :disabled="showResults || !canSubmit"
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
const userAnswers = ref(new Map()); // Map of exerciseIndex -> selected word
const showResults = ref(false);

// Select 10 random exercises on mount
onMounted(() => {
  const shuffled = [...props.exercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  selectedExercises.value = shuffled;
});

// Split sentence into words while preserving spacing and punctuation
const splitSentence = (sentence) => {
  // First split the sentence into tokens, preserving spaces and punctuation
  const matches = sentence.match(/[\w']+|[.,!?;]|\s+/g) || [];
  
  // Map each token to an object with properties indicating if it's selectable
  return matches.map((token, index) => {
    // Check if token is a word (contains letters or apostrophes)
    const isWord = /[\w']+/.test(token);
    
    return {
      text: token,
      id: `${token}-${index}`,
      selectable: isWord // Only true for actual words
    };
  });
};

// Handle word selection
const isWordSelected = (exerciseIndex, wordObj) => {
  return userAnswers.value.get(exerciseIndex) === wordObj.id;
};

const toggleWordSelection = (exerciseIndex, wordObj) => {
  if (isWordSelected(exerciseIndex, wordObj)) {
    userAnswers.value.delete(exerciseIndex);
  } else {
    userAnswers.value.set(exerciseIndex, wordObj.id);
  }
};

// Check if user has answered all questions
const canSubmit = computed(() => {
  return userAnswers.value.size === selectedExercises.value.length;
});

// Check if an answer is correct
const isCorrect = (index) => {
  const selectedWordId = userAnswers.value.get(index);
  const selectedWordObj = splitSentence(selectedExercises.value[index].sentence)
    .find(w => w.id === selectedWordId);
  return selectedWordObj && selectedWordObj.text === selectedExercises.value[index].error_position;
};

// Get sentence with correction applied
const getSentenceWithCorrection = (exercise) => {
  return exercise.sentence.replace(
    exercise.error_position,
    exercise.correction
  );
};

// Validate all answers
const validateAnswers = () => {
  if (!canSubmit.value) return;
  showResults.value = true;
};

// Practice pronunciation
const practicePronunciation = (exercise) => {
  const correctSentence = getSentenceWithCorrection(exercise);
  $textToSpeech.speak(correctSentence, { rate: 0.7 });
};
</script>
