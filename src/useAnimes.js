import { ref, onMounted } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

// Llegeix la col·lecció "animes" de Firestore (només lectura).
export function useAnimes() {
  const animes = ref([])
  const carregant = ref(true)
  const error = ref(false)
  onMounted(async () => {
    try {
      const snap = await getDocs(query(collection(db, 'animes'), orderBy('titol')))
      animes.value = snap.docs.map((d) => {
        const dades = d.data()
        const g = dades.genere
        return { id: d.id, ...dades, generes: Array.isArray(g) ? g : [g] }
      })
    } catch (e) {
      console.error(e)
      error.value = true
    } finally {
      carregant.value = false
    }
  })
  return { animes, carregant, error }
}
