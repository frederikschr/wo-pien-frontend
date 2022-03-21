import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import './axios'

// import Editor from 'primevue/editor'

createApp(App).use(store).use(router).use(PrimeVue).mount('#app')
