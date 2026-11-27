<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listar, tipos, imagen } from '../servicios/api.js'
import Buscador from '../componentes/Buscador.vue'
import Tarjeta from '../componentes/Tarjeta.vue'
import Paginacion from '../componentes/Paginacion.vue'

const route = useRoute()
const router = useRouter()

const pokemon = ref([])
const busqueda = ref(String(route.query.q || ''))
const termino = ref(busqueda.value)
const tipo = ref(String(route.query.tipo || ''))
const pagina = ref(1)
const cargando = ref(true)
const error = ref('')

let temporizador

async function fetchApi() {
  cargando.value = true
  error.value = ''

  try {
    pokemon.value = await listar(tipo.value)
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}

function actualizarUrl() {
  router.replace({
    query: {
      q: termino.value || undefined,
      tipo: tipo.value || undefined
    }
  })
}

watch(busqueda, () => {
  clearTimeout(temporizador)

  temporizador = setTimeout(() => {
    termino.value = busqueda.value
    pagina.value = 1
    actualizarUrl()
  }, 300)
})

watch(tipo, () => {
  pagina.value = 1
  actualizarUrl()
  fetchApi()
})

const filtrados = computed(() => {
  const texto = termino.value.trim().toLowerCase()

  return pokemon.value.filter(item =>
    item.nombre.includes(texto) || String(item.id) === texto
  )
})

const total = computed(() => {
  return Math.max(1, Math.ceil(filtrados.value.length / 12))
})

const visibles = computed(() => {
  return filtrados.value.slice(
    (pagina.value - 1) * 12,
    pagina.value * 12
  )
})

onMounted(fetchApi)

onUnmounted(() => {
  clearTimeout(temporizador)
})
</script>

<template>
  <main class="container py-5">
    <section class="hero row align-items-center g-4 mb-5">
      <div class="col-12 col-lg-6">
        <div class="hero-vitrina">
          <div class="hero-cartas">
            <RouterLink class="mini-carta mini-izq" to="/detalle/1">
              <img :src="imagen(1)" alt="Bulbasaur">
            </RouterLink>

            <RouterLink class="mini-carta mini-centro" to="/detalle/25">
              <img :src="imagen(25)" alt="Pikachu">
            </RouterLink>

            <RouterLink class="mini-carta mini-der" to="/detalle/4">
              <img :src="imagen(4)" alt="Charmander">
            </RouterLink>
          </div>

          <p class="hero-nota mb-0">
            Explorá la Pokédex clásica y elegí tus favoritos
          </p>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <p class="etiqueta">ENCICLOPEDIA DIGITAL</p>

        <h1 class="hero-titulo">
          Descubrí el mundo <span>Pokémon</span>
        </h1>

        <p class="hero-texto mb-4">
          Buscá por nombre o número, filtrá por tipo y armá tu equipo con inteligencia artificial.
        </p>

        <RouterLink class="btn btn-dark" to="/recomendador">
          Armar equipo con IA
        </RouterLink>
      </div>
    </section>

    <section>
      <h2>Catálogo</h2>

      <div class="row g-3 mb-4">
        <div class="col-12 col-md-8">
          <Buscador v-model="busqueda" />
        </div>

        <div class="col-12 col-md-4">
          <label for="tipo" class="form-label">Tipo</label>

          <select id="tipo" v-model="tipo" class="form-select">
            <option value="">Todos los tipos</option>

            <option v-for="(nombre, clave) in tipos"
              :key="clave" :value="clave">
              {{ nombre }}
            </option>
          </select>
        </div>
      </div>

      <p v-if="cargando">Cargando Pokémon...</p>

      <div v-else-if="error">
        <p>{{ error }}</p>

        <button class="btn btn-dark" @click="fetchApi">
          Reintentar
        </button>
      </div>

      <div v-else>
        <p>{{ filtrados.length }} resultados</p>

        <p v-if="!filtrados.length">
          No se encontraron Pokémon.
        </p>

        <div class="row g-4">
          <div v-for="item in visibles" :key="item.id"
            class="col-12 col-sm-6 col-lg-3">
            <Tarjeta :pokemon="item" />
          </div>
        </div>

        <Paginacion :pagina="pagina" :total="total"
          @cambiar="pagina = $event" />
      </div>
    </section>
  </main>
</template>