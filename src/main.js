import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import './axios'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

createApp(App).use(store).use(router).use(MotionPlugin).use(Vuex).use(OpenLayersMap).mount('#app')
