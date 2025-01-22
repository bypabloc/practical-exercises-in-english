import { defineStore } from 'pinia'
import basicExercisesData from '~/data/basic/complete-with-the-correct-verb/index.yml'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    selectedType: null,
    showAnswers: false,
    exercises: {
      basic: {
        label: 'Básico',
        explanation: 'En esta sección encontrarás ejercicios para practicar los conceptos básicos.',
        order: 1,
        isActive: true,
        route: '/basic',
        items: {
          // saludos y presentaciones
          'greetings-and-introductions': {
            label: 'Saludos y Presentaciones',
            explanation: 'En esta sección encontrarás ejercicios para practicar saludos y presentaciones.',
            examples: [],
            order: 1,
            isActive: true,
          },
          // pronombres personales
          'personal-pronouns': {
            order: 2,
            isActive: false,
          },
          // Rutinas Diarias
          'daily-routines': {
            order: 3,
            isActive: false,
          },
          // Presente Simple
          'simple-present': {
            order: 4,
            isActive: false,
          },
          // Negaciones
          'negatives': {
            order: 5,
            isActive: false,
          },
          // Presente Continuo
          'present-continuous': {
            order: 6,
            isActive: false,
          },
          // Diferenciación de Tiempos
          'time-differentiation': {
            order: 7,
            isActive: false,
            'complete-with-the-correct-verb': {
              items: basicExercisesData.items
            },
            'multiple-choice': {},
          },
          // Palabras Indicadoras
          'indicating-words': {
            order: 8,
            isActive: false,
          },


        },
      },
      intermediate: {
        label: 'Intermedio',
        explanation: 'En esta otra sección un poco más avanzados que los básicos.',
        order: 2,
        isActive: false,
        route: '/intermediate',
      },
      advanced: {
        label: 'Avanzado',
        explanation: 'En esta sección encontrarás ejercicios para practicar los conceptos avanzados.',
        order: 3,
        isActive: false,
        route: '/advanced',
      },
    }
  }),
  
  actions: {
    setSelectedType(type) {
      this.selectedType = type
      this.showAnswers = false
    },
    toggleAnswers() {
      this.showAnswers = !this.showAnswers
    },
    getExercisesByLevel(level) {
      return this.exercises[level] || {}
    }
  }
})
