import { defineNuxtPlugin } from 'nuxt/app'

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

export default defineNuxtPlugin({
	name: '$speechComparison',
	enforce: 'pre',
	setup(nuxtApp) {
		const speechComparison = {
			compareWithExpected(expectedText, options = {}) {
				return new Promise((resolve, reject) => {
					recognition.lang = options.lang || 'en-US'
					recognition.interimResults = false
					recognition.maxAlternatives = 5

					recognition.onresult = event => {
						const results = Array.from(event.results[0]).map(result => ({
							transcript: result.transcript.toLowerCase().trim(),
							confidence: result.confidence,
						}))

						const expectedLower = expectedText.toLowerCase().trim()
						const bestMatch = results.reduce(
							(best, current) => {
								const similarity = calculateSimilarity(
									current.transcript,
									expectedLower,
								)
								return similarity > best.similarity
									? { ...current, similarity }
									: best
							},
							{ similarity: 0 },
						)

						resolve({
							spokenText: bestMatch.transcript,
							expectedText: expectedLower,
							similarity: bestMatch.similarity,
							confidence: bestMatch.confidence,
							allResults: results,
						})
					}

					recognition.onerror = event => {
						reject(new Error(event.error))
					}

					recognition.start()
				})
			},

			stopListening() {
				recognition.stop()
			},
		}

		// Helper function to calculate text similarity
		function calculateSimilarity(str1, str2) {
			if (str1 === str2) return 100

			const longer = str1.length > str2.length ? str1 : str2
			const shorter = str1.length > str2.length ? str2 : str1
			const longerLength = longer.length

			if (longerLength === 0) return 100

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

			return ((longerLength - costs[longerLength]) / longerLength) * 100
		}

		nuxtApp.provide('speechComparison', speechComparison)
	},
})
