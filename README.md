# AnimeDainix

Catàleg d'anime fet amb **Vue 3, Vue Router i Cloud Firestore**, publicat a Firebase Hosting. Permet explorar sèries, cercar-les per títol, filtrar-les per gènere, consultar un rànquing per nota i enviar un missatge de contacte.

🔗 **Web publicada:** https://anime-dainix.web.app

## Tecnologies
Vue 3 (Composition API), Vue Router, Vite, Cloud Firestore i Firebase Hosting.

## Instal·lació i desplegament

Requisits: Node.js (versió LTS) i un projecte de Firebase amb Firestore i Hosting activats.

```bash
npm install                # instal·la les dependències
cp .env.example .env       # omple'l amb les claus de la teva app web de Firebase
npm run dev                # executa en local (http://localhost:5173)
npm run build              # genera la versió de producció a la carpeta dist
npx firebase-tools login   # només la primera vegada
npx firebase-tools deploy  # publica Hosting i les regles de Firestore
```

Per carregar les dades inicials a Firestore: `npm run seed` (requereix el fitxer `scripts/serviceAccountKey.json`, que està al `.gitignore` i no es puja a Git).

## Components propis
- `NavBar.vue`: menú de navegació amb `RouterLink`.
- `AnimeCard.vue`: targeta d'un anime (pòster, gèneres, any, episodis i sinopsi en passar-hi el ratolí).
- `EstatMissatge.vue`: mostra els estats de càrrega, sense dades i error.

A més, `src/useAnimes.js` és una funció reutilitzable (composable) que llegeix la col·lecció de Firestore i la comparteixen les vistes.

## Comunicació amb props
- **Pare:** `CatalegView.vue`, que llegeix els documents de Firestore.
- **Fill:** `AnimeCard.vue`.
- **Dades que es passen:** l'objecte `anime` (títol, gèneres, any, episodis, nota, imatge i sinopsi) amb `:anime="a"`. A la vista Top es passa també `posicio`, el número del rànquing, amb `:posicio="i + 1"`.

El fill declara les props amb `defineProps` i només les mostra, sense modificar-les.

## Rutes
| Ruta | Vista | Contingut |
|---|---|---|
| `/` | HomeView | Portada, anime destacat, estadístiques, els 4 més valorats i gèneres |
| `/cataleg` | CatalegView | Llistat d'animes de Firestore amb cercador, filtre per gènere i ordenació |
| `/top` | TopView | Rànquing d'animes ordenats per nota |
| `/contacte` | ContacteView | Formulari de contacte amb validació |
| `/sobre` | SobreView | Informació del projecte i tecnologies |

Firebase Hosting té configurat un *rewrite* a `index.html` (`firebase.json`) perquè l'accés directe i la recàrrega de qualsevol ruta funcionin.

## Firestore
- **Col·lecció:** `animes`.
- **Camps principals:** `titol` (text), `genere` (text o llista de gèneres), `any` (número), `episodis` (número), `puntuacio` (número), `imatge` (ruta de la imatge a `public/img`) i `sinopsi` (text).
- **Vistes que en mostren les dades:** Inici, Catàleg i Top. Les tres gestionen els estats de càrrega, sense dades i error.
- **Regles (`firestore.rules`):** només lectura sobre `animes`; les escriptures estan bloquejades.

El formulari de contacte només valida les dades al navegador i no escriu a Firestore.

## Seguretat
El fitxer `.env` i `scripts/serviceAccountKey.json` estan al `.gitignore` i no es pugen al repositori.