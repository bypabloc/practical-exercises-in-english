<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ difficultySelected.label }}
      </h1>
    </div>

    <!-- Usar el componente NavigationList -->
    <TfsNavigationList 
      :items="activeTopics" 
      :showList="hasActiveTopics"
      @navigate="navigateToLevel"
    />
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises';

const exerciseStore = useExerciseStore();

defineOptions({
  name: 'DifficultyPage',
});

const router = useRouter();
const route = useRoute();

const { difficulty } = route.params;

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

// Filtrar temas activos
const activeTopics = computed(() => {
  return topics.value.filter(topic => topic.isActive);
});

// Validar si hay temas activos
const hasActiveTopics = computed(() => {
  return activeTopics.value.length > 0;
});

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
