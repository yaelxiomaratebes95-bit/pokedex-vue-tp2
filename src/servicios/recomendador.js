import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai'
import { app } from './firebase.js'

export async function recomendar(mensaje, pokemon) {
  if (!app) throw new Error('Falta configurar Firebase en el archivo .env.')

  const ia = getAI(app, { backend: new GoogleAIBackend() })

  const modelo = getGenerativeModel(ia, {
    model: import.meta.env.VITE_FIREBASE_MODEL || 'gemini-3.8-flash',
    generationConfig: {
      thinkingConfig: { thinkingLevel: 'LOW' },
    },
  })

  const prompt = 'Recomendá hasta tres Pokémon para un equipo, en español y texto plano. Usá solamente estos nombres: ' + pokemon.map(item => item.nombre).join(', ') + '. Preferencias: ' + mensaje

  try {
    const respuesta = await modelo.generateContent(prompt)
    return respuesta.response.text()
  } catch (error) {
    if (/429|quota|resource.exhausted/i.test(error.message)) {
      throw new Error('Se alcanzó el límite de consultas. Intentá más tarde.')
    }
    throw error
  }
}