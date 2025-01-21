<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Basic > Complete with the Correct Verb
      </h1>
      <button 
        @click="backTo()"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Basic
      </button>
    </div>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises';

defineOptions({
  name: 'CompleteWithTheCorrectVerb',
});

const router = useRouter();

const { exercisesStore } = useExerciseStore();

const backTo = () => {
  router.push('/basic');
};
</script>
