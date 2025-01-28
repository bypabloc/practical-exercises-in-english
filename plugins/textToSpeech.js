import { defineNuxtPlugin } from "nuxt/app";

const synth = window.speechSynthesis;
let voices = [];

// This will try to find an appropriate English voice with consistent characteristics
function findEnglishVoice() {
  // Get all voices
  const availableVoices = synth.getVoices();
  
  // First try to find Microsoft English voices as they tend to be more consistent
  let voice = availableVoices.find(v => 
    v.name.includes('Microsoft') && 
    v.name.toLowerCase().includes('english') &&
    v.name.toLowerCase().includes('(united states)')
  );

  // If no Microsoft voice, try Google US English
  if (!voice) {
    voice = availableVoices.find(v => 
      v.name.includes('Google US English') || 
      (v.name.toLowerCase().includes('english') && 
       v.lang.startsWith('en-US'))
    );
  }

  // If still no voice found, use any English voice
  if (!voice) {
    voice = availableVoices.find(v => 
      v.lang.startsWith('en-')
    );
  }

  // Fallback to the first available voice if no English voice found
  return voice || availableVoices[0];
}

// Initialize voices and handle the onvoiceschanged event
function initVoices() {
  voices = synth.getVoices();
  if (process.env.NODE_ENV === 'development') {
    console.log('Available voices:', voices.map(v => ({
      name: v.name,
      lang: v.lang
    })));
  }
}

// Initial population of voices
initVoices();

// Set up the voices changed event listener
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = initVoices;
}

export default defineNuxtPlugin({
  name: "$textToSpeech",
  enforce: "pre",
  async setup(nuxtApp) {
    const { $config, $logger } = nuxtApp
    const { ENV } = $config?.public || {}
    const ENVIRONMENTS_ALLOWED = ['local', 'dev']

    const textToSpeech = {
      // Enhanced speak method with more voice control
      speak: (text, options = {}) => {
        // Cancel any ongoing speech
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set rate (speed) - default is 1, range is 0.1 to 10
        utterance.rate = options.rate || 1;

        // pitch: 0 to 2, 1 is default
        utterance.pitch = options.pitch || 1;

        // Use provided voice or fall back to default selection method
        if (options.voice) {
          utterance.voice = options.voice;
        } else {
          utterance.voice = findEnglishVoice();
        }

        // Additional settings for consistency
        utterance.pitch = options.pitch || 1;  // Default pitch
        utterance.volume = options.volume || 1; // Full volume

        // Log voice selection in development
        if (ENVIRONMENTS_ALLOWED.includes(ENV)) {
          nuxtApp.$logger.info('Selected voice:', {
            name: utterance.voice?.name,
            lang: utterance.voice?.lang,
            localService: utterance.voice?.localService,
          })
        }

        // Speak the text
        synth.speak(utterance);

        // Speak the text
        const speakPromise = new Promise((resolve, reject) => {
          utterance.onend = resolve
          utterance.onerror = reject
        })

        return speakPromise
      },

      // Expose method to get all available voices
      getVoices: () => {
        return synth.getVoices();
      }
    };

    nuxtApp.provide("textToSpeech", textToSpeech);
  },
  hooks: {
    "app:created"() {
      // Hook implementation if needed
    },
  },
  env: {
    islands: true,
  },
});
