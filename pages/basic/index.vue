<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Basic Level Exercises</h1>
      <button 
        @click="router.push('/')"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Back to Levels
      </button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <button
        v-for="level in levelsActive"
        :key="level.name"
        @click="navigateToLevel(level.route)"
        class="p-4 text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        {{ level.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises';

defineOptions({
  name: 'Basic',
});

const store = useExerciseStore();
const router = useRouter();

const exercises = computed(() => 
  store.exercises['basic']
);

const levels = [
  {
    name: 'complete-with-the-correct-verb',
    label: 'Complete with the Correct Verb',
    route: '/basic/complete-with-the-correct-verb',
    isActive: true,
  },
];

const levelsActive = computed(() => levels.filter((level) => level.isActive));

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
