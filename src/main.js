import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global.css'

// Global Components
import BaseIcon from '@/components/BaseIcon'

createApp(App).use(store).use(router).component('BaseIcon', BaseIcon).mount('#app')
