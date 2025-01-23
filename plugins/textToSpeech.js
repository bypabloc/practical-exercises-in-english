import { defineNuxtPlugin } from "nuxt/app";

const languages = {
  microsoftRaul: 0, // Spanish (Mexico) (Male)
  microsoftSabina: 1, // Spanish (Mexico) (Female)
  googleGerman: 2, // German
  googleUsEnglish: 3, // US English
  googleUkEnglishFemale: 4, // UK English (Female)
  googleUkEnglishMale: 5, // UK English (Male)
  googleSpanish: 6, // Spanish
  googleUsSpanish: 7, // Spanish (United States)
  googleFrench: 8, // French
  googleHindi: 9, // Hindi
  googleIndonesian: 10, // Indonesian
  googleItalian: 11, // Italian
  googleJapanese: 12, // Japanese
  googleKorean: 13, // Korean
  googleDutch: 14, // Dutch
  googlePolish: 15, // Polish
  googleBrazilianPortuguese: 16, // Portuguese (Brazil)
  googleRussian: 17, // Russian
  googleMandarinChina: 18, // Mandarin (China)
  googleCantoneseHongKong: 19, // Cantonese (Hong Kong)
  googleMandarinTaiwan: 20 // Mandarin (Taiwan)
};

export default defineNuxtPlugin({
  name: "$textToSpeech",
  enforce: "pre",
  async setup(nuxtApp) {
    // const config = nuxtApp?.$config?.public;

    const synth = window.speechSynthesis;
    let voices = [];
    PopulateVoices();
    if (speechSynthesis !== undefined) {
      speechSynthesis.onvoiceschanged = PopulateVoices;
    }
    function PopulateVoices() {
      voices = synth.getVoices();
      voices.forEach((item, index) => console.log(item.name, index));
    }

    const textToSpeech = {
      speak: (
        text,
        options = {},
      ) => {
        const toSpeak = new SpeechSynthesisUtterance(text);
        const lang = options.lang || "googleUsEnglish";
        const rate = options.rate || 1;

        // Set rate (speed) - default is 1, range is 0.1 to 10
        toSpeak.rate = rate;

        // Set voice
        const voice = languages[lang] || 7;
        toSpeak.voice = voices[voice];
        
        synth.speak(toSpeak);
      }
    }
    nuxtApp.provide("textToSpeech", textToSpeech);
  },
  hooks: {
    "app:created"() {
      // const nuxtApp = useNuxtApp();
      // const { $textToSpeech } = nuxtApp;
    },
  },
  env: {
    islands: true,
  },
});
