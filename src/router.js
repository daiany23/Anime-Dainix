import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CatalegView from './views/CatalegView.vue'
import TopView from './views/TopView.vue'
import ContacteView from './views/ContacteView.vue'
import SobreView from './views/SobreView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cataleg', name: 'cataleg', component: CatalegView },
    { path: '/top', name: 'top', component: TopView },
    { path: '/contacte', name: 'contacte', component: ContacteView },
    { path: '/sobre', name: 'sobre', component: SobreView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
