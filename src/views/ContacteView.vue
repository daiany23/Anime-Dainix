<script setup>
import { reactive, ref } from 'vue'

// Formulari només de client: no escriu a Firestore (les regles són de només lectura).
const form = reactive({ nom: '', email: '', tipus: 'Recomanació', missatge: '' })
const errors = ref([])
const enviat = ref(false)

function enviar() {
  errors.value = []
  if (form.nom.trim().length < 2) errors.value.push('Escriu el teu nom.')
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.value.push('El correu no és vàlid.')
  if (form.missatge.trim().length < 10) errors.value.push('El missatge ha de tenir almenys 10 caràcters.')
  if (!errors.value.length) enviat.value = true
}
</script>

<template>
  <section class="form-wrap">
    <h2 class="titol">Parlem-<span>ne</span></h2>
    <div v-if="enviat" class="ok">
      <h3>ありがとう! Gràcies, {{ form.nom }}!</h3>
      <p>Hem rebut el teu missatge sobre «{{ form.tipus }}».</p>
    </div>
    <form v-else @submit.prevent="enviar">
      <label>Nom<input v-model="form.nom" type="text" placeholder="El teu nom" /></label>
      <label>Correu<input v-model="form.email" type="email" placeholder="tu@correu.com" /></label>
      <label>Motiu
        <select v-model="form.tipus"><option>Recomanació</option><option>Error a la web</option><option>Col·laboració</option><option>Altres</option></select>
      </label>
      <label>Missatge<textarea v-model="form.missatge" rows="5" placeholder="Explica'ns quin anime t'agradaria veure…"></textarea></label>
      <ul v-if="errors.length" class="errors"><li v-for="e in errors" :key="e">{{ e }}</li></ul>
      <button class="btn" type="submit">Enviar missatge</button>
    </form>
  </section>
</template>
