<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ topicSelected.label }}
      </h1>
      <button 
        @click="router.push(`/${difficulty}`)"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Back to {{ difficultySelected.label }}
      </button>
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
              <button
                type="button"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                @click="practicePronunciation(example)"
              >
                Practice Pronunciation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Exercises -->
    <div class="mb-4">
      <h2 class="text-xl font-semibold mb-4">Practice Exercises</h2>
      <p class="text-gray-600 mb-6">
        Select an exercise below to practice what you've learned:
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button
        v-for="exercise in exercises"
        :key="exercise.name"
        @click="exercise.isActive ? navigateToLevel(exercise.route) : null"
        :class="[
          exercise.isActive ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-blue-200 text-gray-600 cursor-default',
        ]"
        class="p-4 text-lg rounded-lg transition-colors"
      >
        {{ exercise.name }}
      </button>
    </div>
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
const nuxtApp = useNuxtApp();
const { $textToSpeech } = nuxtApp;

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
    };
  });
  return exercisesArray.sort((a, b) => a.order - b.order);
});

const navigateToLevel = (route) => {
  router.push(route);
};

const practicePronunciation = ({ pronunciation }) => {
  $textToSpeech.speak(pronunciation);
};
</script>
