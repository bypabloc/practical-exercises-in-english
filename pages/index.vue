<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6">
    <h1 class="text-3xl font-bold mb-10">English Practice Exercises</h1>
    
    <div class="flex flex-col gap-4 w-full max-w-md">
      <button
        v-for="difficulty in difficulties"
        :key="difficulty.name"
        @click="difficulty.isActive ? navigateToLevel(difficulty.route) : null"
        :class="[
          difficulty.isActive ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-blue-200 text-gray-600 cursor-default',
        ]"
        class="p-4 text-lg rounded-lg transition-colors"
      >
        {{ difficulty.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises';

const exerciseStore = useExerciseStore();
const router = useRouter();

const difficulties = computed(() => {
  const difficulties = Object.keys(exerciseStore.difficulties).map((difficulty) => {
    return {
      name: exerciseStore.difficulties[difficulty].label,
      route: `/${difficulty}`,
      order: exerciseStore.difficulties[difficulty].order,
      isActive: exerciseStore.difficulties[difficulty].isActive,
    };
  });
  return difficulties.sort((a, b) => a.order - b.order);
});

const navigateToLevel = (route) => {
  console.log(route);
  router.push(route);
};
</script>
