import type { Plugin } from 'vue'
import type { ManagerOptions, SocketOptions } from 'socket.io-client'
import { io } from 'socket.io-client'

export interface SocketIOVueOpts {
  uri: string
  opts?: Partial<ManagerOptions & SocketOptions>
}

const socketIOVue: Plugin = {
  install: (app, options: SocketIOVueOpts) => {
    const socket = io(options.uri, options.opts)
    app.provide('socket', socket)
  }
}
export default socketIOVue
