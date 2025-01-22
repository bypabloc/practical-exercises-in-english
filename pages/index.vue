<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6">
    <h1 class="text-3xl font-bold mb-10">English Practice Exercises</h1>
    
    <div class="flex flex-col gap-4 w-full max-w-md">
      <button
        v-for="level in levels"
        :key="level.name"
        @click="level.isActive ? navigateToLevel(level.route) : null"
        :class="[
          level.isActive ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-blue-200 text-gray-600 cursor-none',
        ]"
        class="p-4 text-lg rounded-lg transition-colors"
      >
        {{ level.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises';

const exerciseStore = useExerciseStore();
const router = useRouter();

const levels = computed(() => {
  const exercises = Object.keys(exerciseStore.exercises).map((level) => {
    return {
      name: exerciseStore.exercises[level].label,
      route: exerciseStore.exercises[level].route,
      order: exerciseStore.exercises[level].order,
      isActive: exerciseStore.exercises[level].isActive,
    };
  });
  return exercises.sort((a, b) => a.order - b.order);
});

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
