<template>
  <div class="p-6">
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
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
  name: 'BasicDifficulty',
});

const router = useRouter();

const route = useRoute()

const { difficulty, topic } = route.params

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
</script>
