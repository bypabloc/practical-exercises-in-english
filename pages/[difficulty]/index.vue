<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ difficultySelected.label }}
      </h1>
    </div>

    <!-- Menú de Navegación -->
    <div class="space-y-4">
      <div v-for="topic in topics" :key="topic.name" class="bg-white rounded-lg shadow-sm">
        <div 
          class="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': !topic.isActive }"
          @click="topic.isActive ? navigateToLevel(topic.route) : null"
        >
          <div class="flex items-center gap-3">
            <!-- Icono del tema -->
            <i class="i-mdi-book text-xl text-blue-500"></i>
            <span class="text-lg font-medium">{{ topic.name }}</span>
          </div>
          
          <!-- Flecha de navegación -->
          <i 
            class="i-mdi-chevron-right text-xl text-gray-400"
            :class="{ 'text-gray-300': !topic.isActive }"
          ></i>
        </div>
      </div>
    </div>
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

const navigateToLevel = (route) => {
  router.push(route);
};
</script>

<style scoped>
/* Estilos adicionales para el menú */
.bg-white {
  border: 1px solid #e5e7eb;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.opacity-50 {
  opacity: 0.5;
}
</style>
