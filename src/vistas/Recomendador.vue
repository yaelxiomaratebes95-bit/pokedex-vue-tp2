<script setup>
import { ref, onMounted } from 'vue'
import { listar } from '../servicios/api.js'
import { recomendar } from '../servicios/recomendador.js'

const pokemon = ref([])
const mensaje = ref('')
const respuesta = ref('')
const cargando = ref(true)
const generando = ref(false)
const error = ref('')
const errorIA = ref('')

async function fetchApi() {
  cargando.value = true
  error.value = ''

  try {
    pokemon.value = (await listar()).slice(0, 151)
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}

async function consultarIA() {
  if (!mensaje.value.trim() || generando.value) return

  generando.value = true
  errorIA.value = ''
  respuesta.value = ''

  try {
    respuesta.value = await recomendar(mensaje.value, pokemon.value)
  } catch (e) {
    errorIA.value = e.message
  } finally {
    generando.value = false
  }
}

onMounted(fetchApi)
</script>

<template>
  <main class="container py-5">

    <h1>Armá tu equipo</h1>

    <p>
      Recibí recomendaciones de Pokémon de la primera generación según tus preferencias.
    </p>

    <p v-if="cargando">Cargando catálogo...</p>

    <div v-else-if="error">
      <p>{{ error }}</p>

      <button class="btn btn-dark" @click="fetchApi">
        Reintentar
      </button>
    </div>

    <form v-else @submit.prevent="consultarIA">

      <label for="mensaje" class="form-label">
        ¿Qué Pokémon te interesan?
      </label>

      <textarea
        id="mensaje"
        v-model="mensaje"
        class="form-control mb-3"
        rows="4"
        required
        placeholder="Me gustan los Pokémon de agua y fuego"
      ></textarea>

      <button
        type="submit"
        class="btn btn-dark"
        :disabled="generando || !mensaje.trim()"
      >
        {{ generando ? 'Generando...' : 'Recomendar' }}
      </button>

    </form>

    <div v-if="errorIA" class="mt-4">
      <p>{{ errorIA }}</p>

      <button class="btn btn-outline-dark" @click="consultarIA">
        Reintentar
      </button>
    </div>

    <section v-if="respuesta" class="respuesta mt-4">
      <h2>Tu recomendación</h2>
      <p>{{ respuesta }}</p>
    </section>

  </main>
</template>