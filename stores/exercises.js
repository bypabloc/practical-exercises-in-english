import { defineStore } from 'pinia'
import basicExercisesData from '~/data/basic/complete-with-the-correct-verb/index.yml'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    selectedType: null,
    showAnswers: false,
    exercises: {
      basic: {
        items: {
          // saludos y presentaciones
          'greetings-and-introductions': {
            order: 1,
          },
          // pronombres personales
          'personal-pronouns': {
            order: 2,
          },
          // Presente Simple y sus Reglas
          'simple-present-and-its-rules': {
            order: 3,
          },
          // Rutinas Diarias
          'daily-routines': {
            order: 4,
          },
          'complete-with-the-correct-verb': {
            items: basicExercisesData.items
          },
          'multiple-choice': {},
        }
      },
      intermediate: {},
      advanced: {},
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
