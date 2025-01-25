import { defineNuxtRouteMiddleware, useRouter } from '#app'
import { useCookieStore } from '~/stores/cookies'

export default defineNuxtRouteMiddleware((to) => {
  // Solo ejecutar del lado del cliente
  if (import.meta.client) {
    const cookieStore = useCookieStore()
    const router = useRouter()

    // Obtener todos los parámetros que empiecen con 'tfs-'
    const tfsParams = {}
    const paramsToRemove = []

    Object.entries(to.query).forEach(([key, value]) => {
      if (key.startsWith('tfs-') && typeof value === 'string') {
        const cookieKey = key
        tfsParams[cookieKey] = value
        paramsToRemove.push(key)
      }
    })

    // Si encontramos parámetros tfs-
    if (Object.keys(tfsParams).length > 0) {
      // Guardar en cookies y store
      Object.entries(tfsParams).forEach(([key, value]) => {
        // Usar el composable useCookie de Nuxt
        const cookie = useCookie(key, {
          maxAge: 30 * 24 * 60 * 60, // 30 días
          path: '/',
          watch: true // Vigilar cambios en el valor
        })
        cookie.value = value
      })

      // Guardar en store
      cookieStore.setMultiple(tfsParams)

      // Remover parámetros de la URL
      const newQuery = { ...to.query }
      paramsToRemove.forEach(param => {
        delete newQuery[param]
      })

      // Actualizar URL sin los parámetros
      router.replace({ 
        query: newQuery 
      })
    } else {
      // Buscar cookies existentes y cargarlas en el store
      const cookieValues = {}
      
      // Buscar todas las cookies que empiecen con 'tfs-'
      const cookies = document.cookie.split(';')
      cookies.forEach(cookie => {
        const [key, value] = cookie.split('=').map(part => part.trim())
        if (key.startsWith('tfs-')) {
          // Usar el composable useCookie para leer el valor
          const cookieRef = useCookie(key)
          if (cookieRef.value) {
            cookieValues[key] = cookieRef.value
          }
        }
      })

      if (Object.keys(cookieValues).length > 0) {
        cookieStore.setMultiple(cookieValues)
      }
    }
  }
})
