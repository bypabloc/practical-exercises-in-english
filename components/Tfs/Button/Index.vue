<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      additionalClasses,
    ]"
    @click="$emit('click', $event)"
  >
    <i v-if="icon" :class="icon" class="mr-2"></i>
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'success', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  additionalClasses: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])

const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none'

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-600 hover:bg-gray-300',
  success: 'bg-green-500 text-white hover:bg-green-600',
  danger: 'bg-red-500 text-white hover:bg-red-600'
}

const sizeClasses = {
  xs: 'px-3 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
}
</script>
