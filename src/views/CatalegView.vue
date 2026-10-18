<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimes } from '../useAnimes'
import AnimeCard from '../components/AnimeCard.vue'
import EstatMissatge from '../components/EstatMissatge.vue'

const route = useRoute()
const { animes, carregant, error } = useAnimes()
const genere = ref(route.query.genere || 'Tots')
const cerca = ref('')
const ordre = ref('titol')

const generes = computed(() => ['Tots', ...new Set(animes.value.flatMap((a) => a.generes))])
const filtrats = computed(() => {
  const llista = animes.value.filter(
    (a) =>
      (genere.value === 'Tots' || a.generes.includes(genere.value)) &&
      a.titol.toLowerCase().includes(cerca.value.toLowerCase())
  )
  return llista.sort((a, b) =>
    ordre.value === 'titol' ? a.titol.localeCompare(b.titol) : b[ordre.value] - a[ordre.value]
  )
})
</script>

<template>
  <section>
    <h2 class="titol">Catàleg <span>complet</span></h2>
    <EstatMissatge v-if="carregant" tipus="carrega" text="Carregant animes…" />
    <EstatMissatge v-else-if="error" tipus="error" text="No s'han pogut carregar les dades. Torna-ho a provar més tard." />
    <EstatMissatge v-else-if="!animes.length" tipus="buit" text="Encara no hi ha cap anime al catàleg." />
    <template v-else>
      <div class="eines">
        <input v-model="cerca" type="search" placeholder="🔎 Cerca per títol…" />
        <select v-model="ordre">
          <option value="titol">Ordena: A-Z</option>
          <option value="puntuacio">Ordena: nota</option>
          <option value="any">Ordena: any</option>
        </select>
      </div>
      <div class="pills">
        <button v-for="g in generes" :key="g" class="pill" :class="{ actiu: g === genere }" @click="genere = g">{{ g }}</button>
      </div>
      <EstatMissatge v-if="!filtrats.length" tipus="buit" text="Cap anime coincideix amb la cerca." />
      <div v-else class="grid">
        <AnimeCard v-for="a in filtrats" :key="a.id" :anime="a" />
      </div>
    </template>
  </section>
</template>
