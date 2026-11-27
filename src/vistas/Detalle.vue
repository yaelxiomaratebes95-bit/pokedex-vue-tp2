<<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { detalle, descripcion, imagen, tipos } from '../servicios/api.js'
import { cambiar, esFavorito } from '../servicios/favoritos.js'

const route = useRoute()
const pokemon = ref(null)
const texto = ref('')
const cargando = ref(true)
const error = ref('')

const estadisticas = {
  hp: 'Salud',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad'
}

async function fetchApi() {
  cargando.value = true
  error.value = ''

  try {
    const datos = await detalle(route.params.id)
    const historia = await descripcion(datos.species.url.split('/').filter(Boolean).pop())

    pokemon.value = datos
    texto.value = historia
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}

onMounted(fetchApi)

watch(() => route.params.id, id => {
  if (id) {
    fetchApi()
  }
})
</script>

<template>
  <main class="container py-5">

    <RouterLink class="btn btn-outline-dark mb-4" to="/">
      ← Volver al catálogo
    </RouterLink>

    <p v-if="cargando">Cargando detalle...</p>

    <div v-else-if="error">
      <p>{{ error }}</p>
      <button class="btn btn-dark" @click="fetchApi">
        Reintentar
      </button>
    </div>

    <article v-else-if="pokemon" class="detalle-ficha">

      <div class="detalle-arriba">

        <div class="tarjeta-barra">
          <button
            class="btn-corazon"
            :class="{ 'favorito-activo': esFavorito(pokemon.id) }"
            :aria-label="esFavorito(pokemon.id) ? 'Quitar favorito' : 'Agregar favorito'"
            @click="cambiar({ id: pokemon.id, nombre: pokemon.name })"
          >
            {{ esFavorito(pokemon.id) ? '♥' : '♡' }}
          </button>

          <span class="tarjeta-numero">
            #{{ String(pokemon.id).padStart(3, '0') }}
          </span>
        </div>

        <img
          class="imagen-detalle"
          :src="imagen(pokemon.id)"
          :alt="pokemon.name"
        >

      </div>

      <div class="detalle-abajo">

        <h1 class="nombre text-center mb-2">
          {{ pokemon.name }}
        </h1>

        <div class="d-flex justify-content-center flex-wrap gap-2 mb-3">
          <span
            v-for="item in pokemon.types"
            :key="item.type.name"
            class="tipo-pill"
          >
            {{ tipos[item.type.name] || item.type.name }}
          </span>
        </div>

        <p class="texto-suave text-center mb-4">
          {{ texto }}
        </p>

        <div class="datos-grid mb-4">

          <div class="dato-caja">
            <span>Altura</span>
            <strong>{{ pokemon.height / 10 }} m</strong>
          </div>

          <div class="dato-caja">
            <span>Peso</span>
            <strong>{{ pokemon.weight / 10 }} kg</strong>
          </div>

          <div class="dato-caja">
            <span>Habilidades</span>
            <strong>
              {{ pokemon.abilities.map(item => item.ability.name).join(', ') }}
            </strong>
          </div>

        </div>

        <h2 class="h5 mb-3">Estadísticas</h2>

        <div
          v-for="item in pokemon.stats"
          :key="item.stat.name"
          class="mb-2"
        >
          <div class="d-flex justify-content-between small mb-1">
            <span>{{ estadisticas[item.stat.name] }}</span>
            <strong>{{ item.base_stat }}</strong>
          </div>

          <progress
            class="d-block w-100"
            :value="item.base_stat"
            :max="Math.max(255, item.base_stat)"
          ></progress>
        </div>

      </div>

    </article>

  </main>
</template>
