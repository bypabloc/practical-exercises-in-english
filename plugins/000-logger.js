export default defineNuxtPlugin(nuxtApp => {
	const { $config } = nuxtApp
	const { ENV } = $config?.public || {}
	const ENVIRONMENTS_ALLOWED = ['local', 'dev']
	const ALLOWED = ENVIRONMENTS_ALLOWED.includes(ENV)

	const getFileOrigin = () => {
		const stack = new Error('log').stack || ''
		const stackLines = stack.split('\n')

		// Filtramos las líneas del stack que pertenecen al propio logger
		const filteredStackLines = stackLines.filter(
			line => !line.includes('logger.js'),
		)

		// Buscamos una línea que corresponda a un archivo .js o .vue dentro de _nuxt
		for (const line of filteredStackLines) {
			const match =
				(line?.match && line.match(/\/_nuxt\/([\w-/.]+\.(js|vue))/)) || []
			if (match && match[1]) {
				// Eliminamos los parámetros de query
				const path = match[1].replace(/\?.*$/, '')
				return path
			}
		}
		return 'unknown'
	}

	const logWithFileOrigin = (level, message, ...optionalParams) => {
		if (ALLOWED) {
			// Colores CSS: https://blog.hubspot.es/website/colores-css
			const colors = {
				INFO: 'color: rgb(0,255,255)', // Azul claro -> 00FFFF
				WARN: 'color: rgb(255,241,118)', // Naranja -> FFF176
				ERROR: 'color: rgb(239,115,115)', // Rojo -> EF5350
				DEBUG: 'color: rgb(95,158,160)', // Verde -> 5F9EA0
			}

			const color = colors?.[level] || colors.INFO

			const formattedMessage = `%c[${level}] [${getFileOrigin()}] ${message}`
			const params = optionalParams.length ? optionalParams : []

			// eslint-disable-next-line no-console
			console.log(formattedMessage, color, ...params)
		}
	}

	const logger = {
		info: (message, ...optionalParams) =>
			logWithFileOrigin('INFO', message, ...optionalParams),
		warn: (message, ...optionalParams) =>
			logWithFileOrigin('WARN', message, ...optionalParams),
		error: (message, ...optionalParams) =>
			logWithFileOrigin('ERROR', message, ...optionalParams),
		debug: (message, ...optionalParams) =>
			logWithFileOrigin('DEBUG', message, ...optionalParams),
	}

	nuxtApp.provide('logger', logger)
})
