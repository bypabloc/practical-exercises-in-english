<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ exerciseSelected.label }}
      </h1>
      <button 
        @click="router.push(`/${difficulty}`)"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Back to {{ difficultySelected.label }}
      </button>
    </div>
    <pre>
      <code>
        {{ exerciseSelected }}
      </code>
    </pre>
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

const { difficulty, topic, exercise } = route.params

const difficultySelected = computed(() => {
  return exerciseStore.difficulties[difficulty] || {};
});

const topicSelected = computed(() => {
  return difficultySelected.value.topics?.[topic] || {};
});

const exerciseSelected = computed(() => {
  return topicSelected.value.exercises?.[exercise] || {};
});

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
