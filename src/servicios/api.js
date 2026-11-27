const base = 'https://pokeapi.co/api/v2/'

export const tipos = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
  steel: 'Acero', fairy: 'Hada',
}

async function consultar(ruta) {
  const respuesta = await fetch(base + ruta)
  if (!respuesta.ok) throw new Error('No se pudieron obtener los datos (' + respuesta.status + ').')
  return respuesta.json()
}

function resumir(pokemon) {
  return {
    id: Number(pokemon.url.split('/').filter(Boolean).pop()),
    nombre: pokemon.name,
  }
}

export async function listar(tipo = '') {
  if (tipo) {
    const datos = await consultar('type/' + tipo)
    return datos.pokemon.map(item => resumir(item.pokemon)).filter(item => item.id < 10000)
  }
  const datos = await consultar('pokemon?limit=2000')
  return datos.results.map(resumir).filter(item => item.id < 10000)
}

export async function detalle(id) {
  return consultar('pokemon/' + id)
}

export async function descripcion(id) {
  const datos = await consultar('pokemon-species/' + id)
  const texto = datos.flavor_text_entries.find(item => item.language.name === 'es')
  return texto ? texto.flavor_text.replace(/\s+/g, ' ') : 'Descripción en español no disponible.'
}

export function imagen(id) {
  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + id + '.png'
}
