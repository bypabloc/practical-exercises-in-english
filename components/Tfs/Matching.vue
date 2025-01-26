<template>
  <div class="max-w-4xl mx-auto p-6">
    <form @submit.prevent="validateAnswers" class="space-y-8">
      <!-- Exercise List -->
      <div class="space-y-8">
        <!-- Instructions -->
        <div class="bg-blue-50 p-4 rounded-lg" v-if="!showResults">
          <p class="text-gray-700">
            Arrastra las frases de la derecha y suéltalas junto a su pareja correcta de la izquierda.
          </p>
        </div>

        <!-- Exercises Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column (Fixed) -->
          <div class="space-y-4">
            <div v-for="(exercise, index) in selectedExercises" :key="'left-' + index"
                 class="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
              <span class="font-bold text-gray-600 shrink-0">{{ index + 1 }}.</span>
              <div class="flex-1">
                <p class="text-lg">{{ exercise.left }}</p>
              </div>
              <!-- Drop Zone -->
              <div class="w-64 min-h-[60px] border-2 rounded-lg p-2 flex items-center justify-center"
                   :class="[
                     showResults 
                       ? (isCorrect(index) ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                       : 'border-gray-200 bg-gray-50',
                     dropZoneClasses[index]
                   ]"
                   @dragover.prevent
                   @drop="handleDrop($event, index)"
                   @dragenter="handleDragEnter(index)"
                   @dragleave="handleDragLeave(index)">
                <p v-if="userAnswers[index]" class="text-md">
                  {{ getRightText(userAnswers[index]) }}
                </p>
                <p v-else class="text-gray-400">Arrastra aquí una respuesta</p>
              </div>
            </div>
          </div>

          <!-- Right Column (Draggable Options) -->
          <div class="space-y-4" :class="{ 'pointer-events-none': showResults }">
            <div v-for="(answer, index) in shuffledRightOptions" :key="'right-' + index"
                 class="bg-white p-4 rounded-lg shadow-sm"
                 :class="[
                   !isAnswerUsed(answer) ? 'cursor-move hover:shadow-md transform hover:-translate-y-1 transition-all' : 'opacity-50',
                   showResults ? 'cursor-default' : ''
                 ]"
                 draggable="true"
                 @dragstart="handleDragStart($event, answer)"
                 v-show="!isAnswerUsed(answer) || showResults">
              <p class="text-lg">{{ answer }}</p>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="showResults" class="space-y-8">
          <div v-for="(exercise, index) in selectedExercises" :key="'result-' + index"
               class="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div class="flex items-start gap-4">
              <span class="font-bold text-gray-600">{{ index + 1 }}.</span>
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-2">
                  <!-- Result Icon and Message -->
                  <div v-if="isCorrect(index)" class="text-green-500 flex items-center gap-2">
                    <i class="i-mdi-check-circle text-xl"></i>
                    <span>¡Correcto!</span>
                  </div>
                  <div v-else class="space-y-2">
                    <span class="text-red-500 flex items-center gap-2">
                      <i class="i-mdi-close-circle text-xl"></i>
                      <span>Incorrecto</span>
                    </span>
                  </div>
                </div>

                <!-- Complete Pair -->
                <div class="pl-4 border-l-4 border-gray-200">
                  <p class="text-lg font-medium">Emparejamiento correcto:</p>
                  <div class="mt-2 space-y-2">
                    <p class="text-gray-800">
                      <span class="font-medium">Inicio:</span> "{{ exercise.left }}"
                    </p>
                    <p class="text-gray-800">
                      <span class="font-medium">Respuesta:</span> "{{ exercise.right }}"
                    </p>
                  </div>
                </div>

                <!-- Complete Pair -->
                <div class="pl-4 border-l-4 border-gray-200">
                  ... (existing pair display)
                  
                  <!-- Add Explanation -->
                  <div v-if="exercise.explanation" class="mt-3 bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-700 mb-2">Explicación:</h4>
                    <p class="text-gray-600">{{ exercise.explanation }}</p>
                  </div>
                </div>

                <!-- Translation & Pronunciation -->
                <div class="text-sm text-gray-600 space-y-1 pl-4 border-l-4 border-gray-200 mt-4">
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
                      :text="`${exercise.left} - ${exercise.right}`"
                    />
                    <TfsButtonPractice :text="exercise.answer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message for incomplete answers -->
        <div v-if="!showResults" class="text-center">
          <p v-if="!allAnswered" class="text-sm text-gray-500">
            Completa todos los emparejamientos antes de verificar las respuestas
          </p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <TfsButton
            type="submit"
            :disabled="showResults || !allAnswered"
            :class="{
              'opacity-50': !allAnswered && !showResults
            }"
            @click="validateAnswers"
          >
            {{ showResults ? 'Completed' : 'Check Answers' }}
          </TfsButton>
        </div>
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

// Component state
const selectedExercises = ref([]);
const userAnswers = ref([]);
const showResults = ref(false);
const dropZoneClasses = ref([]);

// Select 10 random exercises on mount
onMounted(() => {
  const shuffled = [...props.exercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  selectedExercises.value = shuffled;
  userAnswers.value = Array(shuffled.length).fill(null);
  dropZoneClasses.value = Array(shuffled.length).fill('');
});

const allAnswered = computed(() => {
  return userAnswers.value.every(answer => answer !== null);
});

// Compute shuffled right options
const shuffledRightOptions = computed(() => {
  return [...selectedExercises.value.map(ex => ex.right)]
    .sort(() => Math.random() - 0.5);
});

// Check if an answer is used
const isAnswerUsed = (answer) => {
  return userAnswers.value.includes(answer);
};

// Get the text of a right option
const getRightText = (answer) => {
  return answer;
};

// Drag and drop handlers
const handleDragStart = (event, answer) => {
  event.dataTransfer.setData('text/plain', answer);
};

const handleDragEnter = (index) => {
  dropZoneClasses.value[index] = 'border-blue-500 bg-blue-50';
};

const handleDragLeave = (index) => {
  dropZoneClasses.value[index] = '';
};

const handleDrop = (event, index) => {
  const answer = event.dataTransfer.getData('text/plain');
  
  // Remove the answer from its previous position if it exists
  const previousIndex = userAnswers.value.indexOf(answer);
  if (previousIndex !== -1) {
    userAnswers.value[previousIndex] = null;
  }
  
  // Add the answer to the new position
  userAnswers.value[index] = answer;
  dropZoneClasses.value[index] = '';
};

// Check if an answer is correct
const isCorrect = (index) => {
  return userAnswers.value[index] === selectedExercises.value[index].right;
};

// Get user's score
const getScore = () => {
  return selectedExercises.value.reduce((score, _, index) => {
    return score + (isCorrect(index) ? 1 : 0);
  }, 0);
};

// Validate all answers
const validateAnswers = () => {
  if (!allAnswered.value) return;
  showResults.value = true;
};
</script>
