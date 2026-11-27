<script setup>
defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label for="buscar" class="form-label">Buscar Pokémon</label>
  <input id="buscar" type="search" class="form-control" :value="modelValue"
    placeholder="Ej. Pikachu" @input="emit('update:modelValue', $event.target.value)">
</template>
