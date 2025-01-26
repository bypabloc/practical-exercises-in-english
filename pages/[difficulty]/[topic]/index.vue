<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ topicSelected.label }}
      </h1>
    </div>

    <!-- Topic Explanation -->
    <div v-if="topicSelected.explanation" class="mb-8 bg-blue-50 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Understanding {{ topicSelected.label }}</h2>
      <p class="text-gray-700 whitespace-pre-line">{{ topicSelected.explanation }}</p>
    </div>

    <!-- Key Details -->
    <div v-if="topicSelected.details && topicSelected.details.length" class="mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-4">Key Points to Remember</h2>
        <ul class="space-y-3">
          <li v-for="(detail, index) in topicSelected.details" :key="index" 
              class="flex items-start gap-3 text-gray-700">
            <span class="text-blue-500 font-bold">•</span>
            <span>{{ detail }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Examples -->
    <div v-if="topicSelected.examples && topicSelected.examples.length" class="mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-4">Examples</h2>
        <div class="space-y-4">
          <div v-for="(example, index) in topicSelected.examples" :key="index"
               class="p-4 border border-gray-200 rounded">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-medium text-blue-600">Example {{ index + 1 }}:</span>
              <span class="text-gray-800">{{ example.english }}</span>
            </div>
            <div class="text-sm text-gray-600 pl-4 border-l-2 border-gray-200 space-y-1">
              <p><span class="font-medium">Translation:</span> {{ example.spanish }}</p>
              <p><span class="font-medium">Pronunciation:</span> {{ example.pronunciation }}</p>
              <p v-if="example.note"><span class="font-medium">Note:</span> {{ example.note }}</p>

              <!-- Practice Button -->
              <div class="flex items-center gap-2">
                <TfsButtonSpeak :text="example.english" />
                <TfsButtonPractice :example="example" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Exercises -->
    <TfsNavigationList
      :items="filteredExercises" 
      :showList="hasActiveExercises"
      @navigate="navigateToLevel"
    />
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises';

const exerciseStore = useExerciseStore();

defineOptions({
  name: 'TopicPage',
});

const router = useRouter();
const route = useRoute();

const { difficulty, topic } = route.params;

const difficultySelected = computed(() => {
  return exerciseStore.difficulties[difficulty] || {};
});

const topicSelected = computed(() => {
  return difficultySelected.value.topics?.[topic] || {};
});

const exercises = computed(() => {
  const exercisesSelected = topicSelected.value.exercises || {};
  const exercisesArray = Object.keys(exercisesSelected).map((exercise) => {
    return {
      name: exercisesSelected[exercise].label,
      route: `/${difficulty}/${topic}/${exercise}`,
      order: exercisesSelected[exercise].order,
      isActive: exercisesSelected[exercise].isActive,
      hasItems: (exercisesSelected[exercise].items || []).length > 0,
    };
  });
  return exercisesArray.sort((a, b) => a.order - b.order);
});

// Filtrar ejercicios: solo mostrar aquellos CON items
const filteredExercises = computed(() => {
  return exercises.value.filter(exercise => exercise.hasItems); // Cambio aquí
});

// Validar si hay ejercicios activos CON items
const hasActiveExercises = computed(() => {
  return filteredExercises.value.some(exercise => exercise.isActive);
});

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
