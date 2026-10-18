<script setup>
import { ref } from 'vue'
// El component fill només llegeix les props rebudes; no les modifica.
defineProps({
  anime: { type: Object, required: true },
  posicio: { type: Number, default: 0 },
})
const fallada = ref(false)
</script>

<template>
  <article class="card">
    <div class="poster">
      <img v-if="anime.imatge && !fallada" :src="anime.imatge" :alt="anime.titol" loading="lazy" @error="fallada = true" />
      <div v-else class="poster-buit">{{ anime.titol.charAt(0) }}</div>
      <span class="nota">★ {{ anime.puntuacio }}</span>
      <span v-if="posicio" class="rank">#{{ posicio }}</span>
      <div class="overlay"><p>{{ anime.sinopsi }}</p></div>
    </div>
    <div class="info">
      <h3>{{ anime.titol }}</h3>
      <p class="meta"><b>{{ anime.generes.join(', ') }}</b> · {{ anime.any }} · {{ anime.episodis }} ep.</p>
    </div>
  </article>
</template>
