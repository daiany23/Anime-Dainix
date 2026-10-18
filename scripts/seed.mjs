// Carrega data/animes.json a Firestore amb un compte de servei local.
// Descarrega la clau a scripts/serviceAccountKey.json (està al .gitignore: NO la pugis).
import { readFileSync } from 'node:fs'
import admin from 'firebase-admin'

const key = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)))
admin.initializeApp({ credential: admin.credential.cert(key) })
const db = admin.firestore()
const animes = JSON.parse(readFileSync(new URL('../data/animes.json', import.meta.url)))

for (const a of animes) await db.collection('animes').add(a)
console.log(`${animes.length} animes carregats.`)
