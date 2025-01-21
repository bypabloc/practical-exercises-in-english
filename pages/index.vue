<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6">
    <h1 class="text-3xl font-bold mb-10">English Practice Exercises</h1>
    
    <div class="flex flex-col gap-4 w-full max-w-md">
      <button
        v-for="level in levelsActive"
        :key="level.name"
        @click="navigateToLevel(level.route)"
        class="p-4 text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        {{ level.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const levels = [
  { name: 'Basic', route: '/basic', isActive: true },
  { name: 'Intermediate', route: '/intermediate', isActive: false },
  { name: 'Advanced', route: '/advanced', isActive: false },
];

const levelsActive = computed(() => levels.filter((level) => level.isActive));

const navigateToLevel = (route) => {
  router.push(route);
};
</script>
