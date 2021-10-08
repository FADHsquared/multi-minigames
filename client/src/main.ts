import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import socketIOVue, { SocketIOVueOpts } from './plugins/socket.io-vue'

import router from './router'
import './index.css'

const socketIOVueOpts: SocketIOVueOpts = {
  uri: `:${import.meta.env.VITE_SIO_PORT}`,
  opts: {
    autoConnect: false
  }
}

createApp(App)
  .use(createHead())
  .use(router)
  .use(socketIOVue, socketIOVueOpts)
  .mount('#app')
