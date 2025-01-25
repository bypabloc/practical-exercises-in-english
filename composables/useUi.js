import { useBreakpoints, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export function useUi() {
  // 1. Detección por User Agent
  const isMobileByUA = computed(() => {
    if (import.meta.client) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
    }
    return false
  })

  // 2. Detección por ancho de pantalla usando useWindowSize de VueUse
  const { width } = useWindowSize()
  const isMobileByWidth = computed(() => {
    return width.value < 768 // breakpoint común para móvil
  })

  // 3. Detección usando breakpoints de VueUse
  const breakpoints = useBreakpoints({
    mobile: 768,
    tablet: 992,
    desktop: 1200,
  })
  const isMobileByBreakpoint = breakpoints.smaller('mobile')

  // Valor combinado (puedes usar el que prefieras)
  const isMobile = computed(() => {
    // Por user agent y ancho
    return isMobileByUA.value || isMobileByWidth.value

    // Solo por ancho
    // return isMobileByWidth.value

    // Solo por breakpoint
    // return isMobileByBreakpoint.value

    // Por user agent y breakpoint
    // return isMobileByUA.value || isMobileByBreakpoint.value
  })

  return {
    isMobile,
    // Exponer métodos individuales para más control si se necesita
    isMobileByUA,
    isMobileByWidth,
    isMobileByBreakpoint,
  }
}
