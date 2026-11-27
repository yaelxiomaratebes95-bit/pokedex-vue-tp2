<script setup>
defineProps({ pagina: Number, total: Number })
const emit = defineEmits(['cambiar'])
</script>

<template>
  <nav v-if="total > 1" class="paginacion" aria-label="Paginación">
    <button class="btn btn-outline-dark" :disabled="pagina <= 1" @click="emit('cambiar', pagina - 1)">Anterior</button>
    <span>{{ pagina }} de {{ total }}</span>
    <button class="btn btn-outline-dark" :disabled="pagina >= total" @click="emit('cambiar', pagina + 1)">Siguiente</button>
  </nav>
</template>
