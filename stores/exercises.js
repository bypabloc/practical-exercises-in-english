import { defineStore } from 'pinia'
import basicExercisesData from '~/data/basic/complete-with-the-correct-verb/index.yml'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    selectedType: null,
    showAnswers: false,
    difficulties: {
      basic: {
        label: 'Básico',
        explanation: 'En esta sección encontrarás ejercicios para practicar los conceptos básicos.',
        order: 1,
        isActive: true,
        topics: {
          'greetings-and-introductions': {
            label: 'Saludos y Presentaciones',
            explanation: 'En esta sección encontrarás ejercicios para practicar saludos y presentaciones.',
            examples: [],
            order: 1,
            isActive: true,
          },
          'personal-pronouns': {
            label: 'Pronombres Personales',
            order: 2,
            isActive: false,
          },
          'daily-routines': {
            label: 'Rutinas Diarias',
            order: 3,
            isActive: false,
          },
          'simple-present': {
            label: 'Presente Simple',
            order: 4,
            isActive: false,
          },
          'negatives': {
            label: 'Negativos',
            order: 5,
            isActive: false,
          },
          'present-continuous': {
            label: 'Presente Continuo',
            order: 6,
            isActive: false,
          },
          'time-differentiation': {
            label: 'Diferenciación de Tiempos',
            order: 7,
            isActive: true,
            exercises: {
              'complete-with-the-correct-verb': {
                label: 'Completa con el verbo correcto',
                isActive: true,
                order: 1,
                items: basicExercisesData.items,
              },
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 2,
                isActive: false,
              },
            }
          },
          'indicating-words': {
            label: 'Palabras Indicadoras',
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
      },
      advanced: {
        label: 'Avanzado',
        explanation: 'En esta sección encontrarás ejercicios para practicar los conceptos avanzados.',
        order: 3,
        isActive: false,
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
