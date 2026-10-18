<script setup>
import { computed } from 'vue'
import { useAnimes } from '../useAnimes'
import AnimeCard from '../components/AnimeCard.vue'
import EstatMissatge from '../components/EstatMissatge.vue'

const { animes, carregant, error } = useAnimes()
const top = computed(() => [...animes.value].sort((a, b) => b.puntuacio - a.puntuacio))
</script>

<template>
  <section>
    <h2 class="titol">Rànquing <span>Top</span></h2>
    <EstatMissatge v-if="carregant" tipus="carrega" text="Carregant rànquing…" />
    <EstatMissatge v-else-if="error" tipus="error" text="No s'ha pogut carregar el rànquing." />
    <EstatMissatge v-else-if="!animes.length" tipus="buit" text="Encara no hi ha dades." />
    <div v-else class="grid">
      <AnimeCard v-for="(a, i) in top" :key="a.id" :anime="a" :posicio="i + 1" />
    </div>
  </section>
</template>
