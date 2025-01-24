<template>
  <transition 
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
      @click.self="closeModal"
    >
      <div 
        class="relative w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
        :class="[
          sizeClasses[size],
          additionalClasses
        ]"
        @click.stop
      >
        <!-- Header -->
        <div 
          v-if="$slots.header || title" 
          class="flex justify-between items-center p-6 pb-0 border-b border-gray-200"
        >
          <slot name="header">
            <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
          </slot>
          
          <!-- Close Button -->
          <button 
            v-if="closeable" 
            @click="closeModal" 
            class="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Close modal"
          >
            <i class="i-mdi-close text-2xl"></i>
          </button>
        </div>

        <!-- Content -->
        <div 
          class="p-6" 
          :class="{
            'pt-0': $slots.header || title
          }"
        >
          <slot>
            <p class="text-gray-600">{{ content }}</p>
          </slot>
        </div>

        <!-- Footer -->
        <slot name="footer">
          <div 
            v-if="$slots.footer || (confirmText || cancelText)" 
            class="flex justify-end p-6 pt-0 space-x-3"
          >
            <button 
              v-if="cancelText" 
              @click="cancel" 
              class="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button 
              v-if="confirmText" 
              @click="confirm" 
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {{ confirmText }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  // Modal visibility
  isOpen: {
    type: Boolean,
    default: false
  },
  
  // Modal title
  title: {
    type: String,
    default: ''
  },
  
  // Modal content (if not using slots)
  content: {
    type: String,
    default: ''
  },
  
  // Allow closing the modal
  closeable: {
    type: Boolean,
    default: true
  },
  
  // Confirm button text
  confirmText: {
    type: String,
    default: ''
  },
  
  // Cancel button text
  cancelText: {
    type: String,
    default: ''
  },
  
  // Modal size
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  
  // Additional CSS classes
  additionalClasses: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'confirm', 'cancel'])

// Size classes for modal width
const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

// Close modal method
const closeModal = () => {
  if (props.closeable) {
    emit('close')
  }
}

// Confirm method
const confirm = () => {
  emit('confirm')
}

// Cancel method
const cancel = () => {
  emit('cancel')
}
</script>
