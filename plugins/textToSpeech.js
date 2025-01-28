// plugins/textToSpeech.js
import { defineNuxtPlugin } from 'nuxt/app'

class TextToSpeechService {
  constructor(nuxtApp) {
    this.synth = window.speechSynthesis
    this.voices = []
    this.nuxtApp = nuxtApp
    this.isInitialized = false
    this.initializeVoices()
  }

  async initializeVoices() {
    // Get initial voices
    this.voices = this.synth.getVoices()

    // Set up voice change listener
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices()
        this.isInitialized = true
      }
    } else {
      this.isInitialized = true
    }

    // Wait for voices to be loaded
    if (this.voices.length === 0) {
      await new Promise(resolve => {
        const checkVoices = setInterval(() => {
          this.voices = this.synth.getVoices()
          if (this.voices.length > 0) {
            clearInterval(checkVoices)
            this.isInitialized = true
            resolve()
          }
        }, 100)
      })
    }
  }

  findAppropriateVoice(options = {}) {
    // Update voices list
    this.voices = this.synth.getVoices()

    // Prioritization strategy for voice selection
    const voicePriorities = [
      // 1. Specific voice if provided
      v => options.voice && v.name === options.voice.name,
      
      // 2. Specific voice name if provided
      v => options.voiceName && v.name.toLowerCase() === options.voiceName.toLowerCase(),
      
      // 3. US English voices
      v => v.lang.toLowerCase() === 'en-us',
      
      // 4. Any English voice
      v => v.lang.toLowerCase().startsWith('en-'),
      
      // 5. Google or Microsoft voices
      v => v.name.toLowerCase().includes('google') && v.lang.toLowerCase().startsWith('en-'),
      v => v.name.toLowerCase().includes('microsoft') && v.lang.toLowerCase().startsWith('en-'),
      
      // 6. Default to first available voice
      () => true
    ]

    // Try each priority level
    for (const priorityCheck of voicePriorities) {
      const matchedVoice = this.voices.find(priorityCheck)
      if (matchedVoice) return matchedVoice
    }

    return this.voices[0]
  }

  async speak(text, options = {}) {
    if (!this.isInitialized) {
      await this.initializeVoices()
    }

    return new Promise((resolve, reject) => {
      try {
        // Cancel any ongoing speech
        this.synth.cancel()

        const utterance = new SpeechSynthesisUtterance(text)

        // Configure utterance
        utterance.rate = options.rate || 0.7  // Speed: 0.1 to 10
        utterance.pitch = options.pitch || 1  // Pitch: 0 to 2
        utterance.volume = options.volume || 1 // Volume: 0 to 1

        // Select appropriate voice
        const selectedVoice = this.findAppropriateVoice(options)
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }

        // Set up handlers
        utterance.onend = () => resolve()
        utterance.onerror = (error) => reject(error)

        // Log voice selection in development
        if (this.nuxtApp.$config.public.ENV === 'dev') {
          console.log('Selected voice:', {
            name: utterance.voice?.name,
            lang: utterance.voice?.lang,
            localService: utterance.voice?.localService
          })
        }

        // Speak the text
        this.synth.speak(utterance)

      } catch (error) {
        reject(error)
      }
    })
  }

  getVoices() {
    // Return all available English voices with metadata
    return this.voices
      .filter(voice => voice.lang.toLowerCase().startsWith('en-'))
      .map(voice => ({
        name: voice.name,
        lang: voice.lang,
        localService: voice.localService,
        default: voice.default
      }))
  }
}

export default defineNuxtPlugin({
  name: '$textToSpeech',
  enforce: 'pre',
  async setup(nuxtApp) {
    // Only initialize on client side
    if (process.client) {
      const tts = new TextToSpeechService(nuxtApp)
      nuxtApp.provide('textToSpeech', tts)
    }
  }
})