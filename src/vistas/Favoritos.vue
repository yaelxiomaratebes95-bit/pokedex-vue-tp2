<script setup>
import { favoritos } from '../servicios/favoritos.js'
import Tarjeta from '../componentes/Tarjeta.vue'
</script>

<template>
  <main class="container py-5">

    <h1>Mis favoritos</h1>

    <p v-if="!favoritos.length">
      Todavía no guardaste ningún Pokémon.
      <RouterLink to="/">Explorar catálogo</RouterLink>
    </p>

    <TransitionGroup name="lista" tag="div" class="row g-4">
      <div
        v-for="item in favoritos"
        :key="item.id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <Tarjeta :pokemon="item" />
      </div>
    </TransitionGroup>

  </main>
</template>