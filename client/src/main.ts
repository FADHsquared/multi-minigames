import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import socketIOVue, { SocketIOVueOpts } from './plugins/socket.io-vue'
import axiosVue from './plugins/axios-vue'

import router from './router'
import './index.css'

const socketIOVueOpts: SocketIOVueOpts = {
  uri: import.meta.env.VITE_SIO_PORT ? `:${import.meta.env.VITE_SIO_PORT}` : '',
  opts: {
    autoConnect: false
  }
}

createApp(App)
  .use(createHead())
  .use(router)
  .use(socketIOVue, socketIOVueOpts)
  .use(axiosVue)
  .mount('#app')
