<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ difficultySelected.label }}
      </h1>
      <button 
        @click="router.push('/')"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Back to Difficulties
      </button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <button
        v-for="topic in topics"
        :key="topic.name"
        @click="topic.isActive ? navigateToLevel(topic.route) : null"
        :class="[
          topic.isActive ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-blue-200 text-gray-600 cursor-default',
        ]"
        class="p-4 text-lg rounded-lg transition-colors"
      >
        {{ topic.name }}
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

const { difficulty } = route.params

const difficultySelected = computed(() => {
  return exerciseStore.difficulties[difficulty] || {};
});

const topics = computed(() => {
  const topicsSelected = difficultySelected.value.topics || {};
  const topicsArray = Object.keys(topicsSelected).map((topic) => {
    return {
      name: topicsSelected[topic].label,
      route: `/${difficulty}/${topic}`,
      order: topicsSelected[topic].order,
      isActive: topicsSelected[topic].isActive,
    };
  });
  return topicsArray.sort((a, b) => a.order - b.order);
});

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
