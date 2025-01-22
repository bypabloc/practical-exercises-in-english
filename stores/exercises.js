import { defineStore } from 'pinia'
import basicExercisesData from '~/data/basic/complete-with-the-correct-verb/index.yml'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    selectedType: null,
    showAnswers: false,
    exercises: {
      basic: {
        items: {
          'complete-with-the-correct-verb': {
            items: basicExercisesData.items
          },
          'multiple-choice': {
            items: [
              {
                question: 'John ___ breakfast at 7 AM.',
                options: ['have', 'has', 'haves'],
                answer: 'has',
                translation: 'John desayuna a las 7 AM',
                pronunciation: 'Yon jas brekfast at seven ei em',
              },
            ]
          },
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
