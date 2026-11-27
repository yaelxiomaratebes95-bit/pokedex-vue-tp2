import { ref } from 'vue'

const clave = 'pokedex-favoritos'
let guardados = []

try {
  guardados = JSON.parse(localStorage.getItem(clave)) || []
} catch {
  guardados = []
}

export const favoritos = ref(Array.isArray(guardados) ? guardados : [])

export function esFavorito(id) {
  return favoritos.value.some(item => item.id === id)
}

export function cambiar(pokemon) {
  if (esFavorito(pokemon.id)) {
    favoritos.value = favoritos.value.filter(item => item.id !== pokemon.id)
  } else {
    favoritos.value.push(pokemon)
  }

  localStorage.setItem(clave, JSON.stringify(favoritos.value))
}