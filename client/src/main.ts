import { createApp } from 'vue'
import { createHead } from "@vueuse/head"
import App from './App.vue'

import router from './router'
import './index.css'

createApp(App).use(createHead()).use(router).mount('#app')
