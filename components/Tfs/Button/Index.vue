<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      baseClasses,
      !disabled ? variantClasses[variant] : 'bg-gray-300 text-gray-600',
      sizeClasses[size],
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      isIconOnly ? 'p-2' : sizeClasses[size],
      additionalClasses,
    ]"
    @click="$emit('click', $event)"
  >
    <i 
      v-if="icon" 
      :class="[
        `i-${icon}`,
        !isIconOnly && $slots.default ? 'mr-2' : '',
        iconClasses
      ]"
    ></i>
    <span 
      v-if="$slots.default"
      :class="[
        isIconOnly ? 'sr-only' : ''
      ]"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	type: {
		type: String,
		default: 'button',
	},
	variant: {
		type: String,
		default: 'primary',
		validator: value =>
			['primary', 'secondary', 'success', 'danger', 'ghost'].includes(value),
	},
	size: {
		type: String,
		default: 'md',
		validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	icon: {
		type: String,
		default: '',
	},
	iconClasses: {
		type: String,
		default: '',
	},
	isIconOnly: {
		type: Boolean,
		default: false,
	},
	additionalClasses: {
		type: String,
		default: '',
	},
})

defineEmits(['click'])

const baseClasses = computed(() => {
	let classes =
		'inline-flex items-center justify-center font-medium focus:outline-none'
	// Solo agregar bordes y redondeo si no es ghost
	if (props.variant !== 'ghost') {
		classes += ' rounded-md'
	}
	return classes
})

const variantClasses = {
	primary: 'bg-blue-500 text-white hover:bg-blue-600',
	secondary: 'bg-gray-200 text-gray-600 hover:bg-gray-300',
	success: 'bg-green-500 text-white hover:bg-green-600',
	danger: 'bg-red-500 text-white hover:bg-red-600',
	ghost: 'bg-transparent border border-transparent',
}

const sizeClasses = {
	xs: 'px-3 py-1 text-xs',
	sm: 'px-3 py-2 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
	xl: 'px-8 py-4 text-xl',
}
</script>
