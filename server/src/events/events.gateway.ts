import type { TicTacToeTurnPayload } from '../../../types'

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server } from 'socket.io'

@WebSocketGateway({ cors: true, serveClient: false })
export class EventsGateway {
  private readonly logger = new Logger(EventsGateway.name)

  @WebSocketServer()
  server: Server

  @SubscribeMessage('connection')
  handleConnect() {
    this.logger.log('connected soembody')
  }

  @SubscribeMessage('send-turn')
  handleMessage(@MessageBody() data: TicTacToeTurnPayload) {
    this.logger.log(data)
    return data
  }
}
