import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
import router from './router'
import store from './store'
import './axios'

createApp(App).use(store).use(router).use(MotionPlugin).use(OpenLayersMap).mount('#app')
