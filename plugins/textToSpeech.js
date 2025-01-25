import { defineNuxtPlugin } from "nuxt/app";

const synth = window.speechSynthesis;
let voices = [];

// Enhanced voice selection strategy
function findAppropriateVoice(options = {}) {
  // Ensure voices are populated
  voices = synth.getVoices();

  // Prioritization strategy for voice selection
  const voicePriorities = [
    // 1. Specific voice name match
    v => options.voiceName && v.name.toLowerCase() === options.voiceName.toLowerCase(),
    
    // 2. Language-specific voices with preference for English
    v => v.lang.toLowerCase().startsWith('en-us'),
    v => v.lang.toLowerCase().startsWith('en-'),
    
    // 3. Google or Microsoft voices
    v => v.name.toLowerCase().includes('google us english'),
    v => v.name.toLowerCase().includes('microsoft'),
    
    // 4. Any English voice
    v => /^en-/i.test(v.lang),
    
    // 5. Fallback: first available voice
    () => true
  ];

  // Try each priority strategy
  for (const priorityCheck of voicePriorities) {
    const matchedVoice = voices.find(priorityCheck);
    if (matchedVoice) return matchedVoice;
  }

  // Absolute fallback
  return voices[0] || null;
}

export default defineNuxtPlugin({
  name: "$textToSpeech",
  enforce: "pre",
  async setup(nuxtApp) {
    const textToSpeech = {
      speak: (text, options = {}) => {
        // Ensure voices are up to date
        voices = synth.getVoices();

        // Cancel any ongoing speech
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set rate (speed) - default is 1, range is 0.1 to 10
        utterance.rate = options.rate || 1;

        // Pitch: 0 to 2, 1 is default
        utterance.pitch = options.pitch || 1;

        // Sophisticated voice selection
        try {
          // If a specific voice is provided, try to use it
          if (options.voice) {
            utterance.voice = options.voice;
          } else {
            // Find an appropriate voice using advanced selection
            const selectedVoice = findAppropriateVoice({
              voiceName: options.voiceName
            });

            if (selectedVoice) {
              utterance.voice = selectedVoice;
            }
          }

          // Additional settings for consistency
          utterance.volume = options.volume || 1; // Full volume

          // Debugging for development
          if (process.env.NODE_ENV === 'development') {
            console.log('Selected voice:', {
              name: utterance.voice?.name,
              lang: utterance.voice?.lang,
              localService: utterance.voice?.localService
            });
          }

          // Speak the text
          synth.speak(utterance);
        } catch (error) {
          console.error('Text-to-Speech Error:', error);
        }
      },

      // Enhanced method to get voices with additional filtering
      getVoices: () => {
        let availableVoices = synth.getVoices();
        
        // Filter for English voices and provide more details
        return availableVoices
          .filter(voice => voice.lang.toLowerCase().startsWith('en-'))
          .map(voice => ({
            name: voice.name,
            lang: voice.lang,
            localService: voice.localService,
            default: voice.default
          }));
      }
    };

    // Ensure voices are populated on first load
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
      };
    }

    nuxtApp.provide("textToSpeech", textToSpeech);
  }
});