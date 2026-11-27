<script setup>
import Navegacion from './componentes/Navegacion.vue'
</script>

<template>
  <div class="contenedor-principal">
    <Navegacion />

    <RouterView v-slot="{ Component }">
      <Transition name="vista" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <footer class="container py-4 pie">
      Pokédex · Datos e imágenes de
      <a href="https://pokeapi.co/">PokéAPI</a>
    </footer>
  </div>
</template>