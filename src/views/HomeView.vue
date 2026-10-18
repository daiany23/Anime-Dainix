<script setup>
import { computed } from 'vue'
import { useAnimes } from '../useAnimes'
import AnimeCard from '../components/AnimeCard.vue'
import EstatMissatge from '../components/EstatMissatge.vue'

const { animes, carregant, error } = useAnimes()
const top = computed(() => [...animes.value].sort((a, b) => b.puntuacio - a.puntuacio))
const destacat = computed(() => top.value[0])
const generes = computed(() => [...new Set(animes.value.flatMap((a) => a.generes))])
const mitjana = computed(() =>
  animes.value.length ? (animes.value.reduce((s, a) => s + a.puntuacio, 0) / animes.value.length).toFixed(1) : '–'
)
const text = 'ANIME ★ アニメ ★ MANGA ★ 漫画 ★ OTAKU ★ オタク ★ '.repeat(4)
</script>

<template>
  <section class="hero">
    <span class="kanji">アニメ</span>
    <div class="hero-text">
      <p class="pinzell">いらっしゃいませ · Benvingut</p>
      <h1>Anime<span>Dainix</span></h1>
      <p class="lead">El teu racó per descobrir animes clàssics imprescindibles i joies amagades.</p>
      <div class="hero-btns">
        <RouterLink to="/cataleg" class="btn">Explora el catàleg</RouterLink>
        <RouterLink to="/top" class="btn ghost">Veure el top</RouterLink>
      </div>
    </div>
    <RouterLink v-if="destacat" to="/top" class="spot">
      <img v-if="destacat.imatge" :src="destacat.imatge" :alt="destacat.titol" @error="$event.target.style.display = 'none'" />
      <div class="spot-info"><small>★ Destacat</small><b>{{ destacat.titol }}</b><span>{{ destacat.generes.join(', ') }} · ★ {{ destacat.puntuacio }}</span></div>
    </RouterLink>
  </section>

  <div class="marquee"><div class="track"><span>{{ text }}</span><span>{{ text }}</span></div></div>

  <section class="stats">
    <div><b>{{ animes.length }}</b><span>Animes</span></div>
    <div><b>{{ generes.length }}</b><span>Gèneres</span></div>
    <div><b>{{ mitjana }}</b><span>Nota mitjana</span></div>
  </section>

  <section>
    <h2 class="titol">Els més <span>valorats</span></h2>
    <EstatMissatge v-if="carregant" tipus="carrega" text="Carregant animes…" />
    <EstatMissatge v-else-if="error" tipus="error" text="No s'han pogut carregar les dades." />
    <EstatMissatge v-else-if="!animes.length" tipus="buit" text="Encara no hi ha cap anime." />
    <div v-else class="grid">
      <AnimeCard v-for="(a, i) in top.slice(0, 4)" :key="a.id" :anime="a" :posicio="i + 1" />
    </div>
  </section>

  <section v-if="generes.length">
    <h2 class="titol">Explora per <span>gènere</span></h2>
    <div class="pills">
      <RouterLink v-for="g in generes" :key="g" :to="{ path: '/cataleg', query: { genere: g } }" class="pill">{{ g }}</RouterLink>
    </div>
  </section>

  <section class="cta">
    <h2>Trobes a faltar algun anime?</h2>
    <p>Explica'ns quin i el podem afegir al catàleg.</p>
    <RouterLink to="/contacte" class="btn">Escriu-nos</RouterLink>
  </section>
</template>
