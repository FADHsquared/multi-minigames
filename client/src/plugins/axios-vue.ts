import type { Plugin } from 'vue'
import axios from 'axios'

const axiosVue: Plugin = {
  install: (app) => {
    app.provide('axios', axios)
  }
}
export default axiosVue
