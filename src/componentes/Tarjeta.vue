<script setup>
import { imagen } from '../servicios/api.js'
import { cambiar, esFavorito } from '../servicios/favoritos.js'
defineProps({ pokemon: { type: Object, required: true } })
</script>

<template>
  <article class="tarjeta">
    <div class="tarjeta-arriba">
      <div class="tarjeta-barra">
        <button class="btn-corazon" :class="{ 'favorito-activo': esFavorito(pokemon.id) }"
          :aria-label="esFavorito(pokemon.id) ? 'Quitar favorito' : 'Agregar favorito'"
          @click="cambiar(pokemon)">{{ esFavorito(pokemon.id) ? '♥' : '♡' }}</button>
        <span class="tarjeta-numero">#{{ String(pokemon.id).padStart(3, '0') }}</span>
      </div>
      <RouterLink :to="'/detalle/' + pokemon.id">
        <img :src="imagen(pokemon.id)" :alt="pokemon.nombre" loading="lazy">
      </RouterLink>
    </div>
    <div class="tarjeta-abajo">
      <h2 class="h5 nombre">{{ pokemon.nombre }}</h2>
      <RouterLink class="btn btn-dark w-100 mt-2" :to="'/detalle/' + pokemon.id">Ver detalle</RouterLink>
    </div>
  </article>
</template>
