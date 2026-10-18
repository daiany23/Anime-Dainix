<script setup>
defineProps({
  tipus: { type: String, required: true }, // 'carrega' | 'buit' | 'error'
  text: { type: String, default: '' },
})
</script>

<template>
  <div class="estat" :class="tipus">
    <div v-if="tipus === 'carrega'" class="spinner"></div>
    <p>{{ text }}</p>
  </div>
</template>
