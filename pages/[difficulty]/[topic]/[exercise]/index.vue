<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        {{ exerciseSelected.label }}
      </h1>
    </div>

    <!-- Dynamic Exercise Component -->
    <Suspense v-if="exerciseSelected.items && ExerciseComponent">
      <ExerciseComponent :exercises="exerciseSelected.items" />
      <template #fallback>
        <div class="flex justify-center items-center p-8">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent, markRaw } from 'vue';
import { useExerciseStore } from '~/stores/exercises';

const exerciseStore = useExerciseStore();

defineOptions({
  name: 'ExercisePage',
});

const router = useRouter();
const route = useRoute();

const { difficulty, topic, exercise } = route.params;

const difficultySelected = computed(() => {
  return exerciseStore.difficulties[difficulty] || {};
});

const topicSelected = computed(() => {
  return difficultySelected.value.topics?.[topic] || {};
});

const exerciseSelected = computed(() => {
  return topicSelected.value.exercises?.[exercise] || {};
});

const ExerciseComponent = computed(() => {
  if (!exerciseSelected.value.component) return null;
  
  return markRaw(defineAsyncComponent(() => 
    import(`~/components/Tfs/${exerciseSelected.value.component}.vue`)
  ));
});
</script>