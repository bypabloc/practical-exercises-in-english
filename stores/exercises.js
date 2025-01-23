import { defineStore } from 'pinia'
import basicGreetingAndIntroductionsFillInTheBlanks from '~/data/basic/greetings-and-introductions/fill-in-the-blanks.yml'
import basicGreetingAndIntroductionsMatchingExercises from '~/data/basic/greetings-and-introductions/matching-exercises.yml'
import basicGreetingAndIntroductionsMultipleChoice from '~/data/basic/greetings-and-introductions/multiple-choice.yml'
import basicTimeDifferentiationCompleteWithTheCorrectVerb from '~/data/basic/time-differentiation/complete-with-the-correct-verb.yml'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    selectedType: null,
    showAnswers: false,
    difficulties: {
      basic: {
        label: 'Basic',
        explanation: '',
        order: 1,
        isActive: true,
        topics: {
          'greetings-and-introductions': {
            label: 'Greetings and Introductions',
            explanation: `In English, greetings and introductions are more natural and flexible than traditional textbook dialogues. While schools often teach formal patterns like "Student A: My name is... Student B: My name is...", real conversations are more dynamic. There are many ways to greet people and introduce yourself, from formal to informal situations. The key is to sound natural and appropriate for the context.`,
            details: [
              "Instead of always using 'My name is...', you can simply say your name directly - it sounds more natural",
              "There are many variations of 'Nice to meet you': 'Pleased to meet you', 'Lovely to meet you', 'Good to meet you', 'Great to meet you'",
              "Pay attention to pronunciation, especially in phrases like 'pleased to meet you' where 'pleased' ends with a 'd' sound, not 't'",
              "Use natural sounds like 'oh', 'ah', 'um' to make your English sound more authentic",
              "The formality of your greeting should match the situation - formal for business, casual for friends",
              "Remember that English speakers often add little expressions to sound friendlier"
            ],
            examples: [
              {
                english: "Hi, I'm Kim",
                translation: "Hola, soy Kim",
                pronunciation: "jai, aim Kim"
              },
              {
                english: "Nice to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "nais tu mit yu"
              },
              {
                english: "Pleased to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "plisd tu mit yu"
              },
              {
                english: "Good to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "gud tu mit yu"
              },
              {
                english: "Lovely to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "lávli tu mit yu",
                note: "Remember 'lovely' comes from 'love' + 'ly', don't pronounce it as 'love-ely'"
              },
              {
                english: "It's wonderful to make your acquaintance",
                translation: "Es maravilloso conocerte (formal)",
                pronunciation: "its uánderful tu meik yor akuéintans"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                items: basicGreetingAndIntroductionsMultipleChoice.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                items: basicGreetingAndIntroductionsFillInTheBlanks.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                items: basicGreetingAndIntroductionsMatchingExercises.items,
              },
            },
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
                component: 'CompleteWithTheCorrectVerb',
                items: basicTimeDifferentiationCompleteWithTheCorrectVerb.items,
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
