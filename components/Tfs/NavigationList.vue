<template>
  <div class="space-y-4">
    <div class="mb-4"
      v-if="!showList"
    >
      <h1 class="text-2xl font-bold">
        Has no exercises assigned for this topic
      </h1>
    </div>
    <div class="mb-4"
      v-if="showList"
    >
      <h2 class="text-xl font-semibold mb-4">Practice Exercises</h2>
      <p class="text-gray-600 mb-6">
        Select an exercise below to practice what you've learned:
      </p>
    </div>

    <div 
      v-for="(item, index) in items" 
      :key="item.name" 
      class="bg-white rounded-lg shadow-sm"
    >
      <div 
        class="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': !item.isActive }"
        @click="item.isActive ? $emit('navigate', item.route) : null"
      >
        <div class="flex items-center gap-3">
          <!-- Número de posición -->
          <span class="text-lg font-medium text-gray-500">{{ index + 1 }}.</span>
          
          <!-- Icono del tema -->
          <i class="i-mdi-book text-xl text-blue-500"></i>
          
          <!-- Nombre del tema -->
          <span class="text-lg font-medium">{{ item.name }}</span>
        </div>
        
        <!-- Flecha de navegación -->
        <i 
          class="i-mdi-chevron-right text-xl text-gray-400"
          :class="{ 'text-gray-300': !item.isActive }"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  showList: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['navigate']);
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
