import { useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

export const breakpointsTailwind = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
}

export function useUi() {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isMobile = computed(() => {
    if (import.meta.client) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      return isMobileUA || breakpoints.smaller('md').value
    }
    return false
  })

  const isSmaller = {
    sm: breakpoints.smaller('sm'),
    md: breakpoints.smaller('md'),
    lg: breakpoints.smaller('lg'),
    xl: breakpoints.smaller('xl'),
    '2xl': breakpoints.smaller('2xl'),
  }

  const isGreater = {
    sm: breakpoints.greater('sm'),
    md: breakpoints.greater('md'),
    lg: breakpoints.greater('lg'),
    xl: breakpoints.greater('xl'),
    '2xl': breakpoints.greater('2xl'),
  }

  return {
    isMobile,
    breakpoints,
    isSmaller,
    isGreater
  }
}
