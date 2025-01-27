import { defineNuxtPlugin } from 'nuxt/app'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

export default defineNuxtPlugin({
  name: '$speechComparison',
  enforce: 'pre',
  setup(nuxtApp) {
    const speechComparison = {
      isListening: false,
      
      startListening(options = {}) {
        return new Promise((resolve, reject) => {
          try {
            // Configure recognition
            recognition.lang = options.lang || 'en-US'
            recognition.interimResults = false
            recognition.maxAlternatives = 5

            // Set up handlers
            recognition.onstart = () => {
              this.isListening = true
              if (options.onStart) options.onStart()
            }

            recognition.onend = () => {
              this.isListening = false
              if (options.onEnd) options.onEnd()
            }

            recognition.onresult = async (event) => {
              const transcript = event.results[0][0].transcript
              
              if (options.expectedText) {
                // If expectedText is provided, calculate similarity
                try {
                  const comparison = await this.calculateSimilarity(
                    this.normalizeText(transcript),
                    this.normalizeText(options.expectedText)
                  )
                  resolve({
                    spokenText: transcript,
                    expectedText: options.expectedText,
                    similarity: comparison.similarity,
                    confidence: event.results[0][0].confidence
                  })
                } catch (error) {
                  reject(error)
                }
              } else {
                // If no expectedText, just return the transcript
                resolve({
                  spokenText: transcript,
                  confidence: event.results[0][0].confidence
                })
              }
            }

            recognition.onerror = (error) => {
              this.isListening = false
              if (options.onError) options.onError(error)
              reject(error)
            }

            // Start recognition
            recognition.start()
          } catch (error) {
            reject(error)
          }
        })
      },

      stopListening() {
        if (this.isListening) {
          recognition.stop()
          this.isListening = false
        }
      },

      // Helper function to normalize text for comparison
      normalizeText(text) {
        return text
          .toLowerCase() // Convert to lowercase
          .trim() // Remove leading/trailing whitespace
          .replace(/[.,!?;:'"]/g, '') // Remove punctuation
          .replace(/\s+/g, ' ') // Normalize whitespace
      },

      // Helper function to calculate text similarity
      calculateSimilarity(str1, str2) {
        if (str1 === str2) return { similarity: 100 }
        
        const longer = str1.length > str2.length ? str1 : str2
        const shorter = str1.length > str2.length ? str2 : str1
        const longerLength = longer.length
        
        if (longerLength === 0) return { similarity: 100 }
        
        const costs = []
        for (let i = 0; i <= longerLength; i++) {
          costs[i] = i
        }
        
        let currentValue, insertions, deletions, substitutions
        for (let i = 1; i <= shorter.length; i++) {
          costs[0] = i
          let nw = i - 1
          for (let j = 1; j <= longer.length; j++) {
            currentValue = costs[j]
            insertions = currentValue + 1
            deletions = costs[j - 1] + 1
            substitutions = nw + (shorter[i - 1] !== longer[j - 1] ? 1 : 0)
            costs[j] = Math.min(insertions, deletions, substitutions)
            nw = currentValue
          }
        }
        
        return {
          similarity: ((longerLength - costs[longerLength]) / longerLength) * 100
        }
      }
    }

    nuxtApp.provide('speechComparison', speechComparison)
  }
})
