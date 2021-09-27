import type { TicTacToeTurnPayload } from '../../../types'

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'

@WebSocketGateway({ cors: true, serveClient: false })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(EventsGateway.name)

  @WebSocketServer()
  server: Server

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Connection: ${client.id}`)
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Disconnection: ${client.id}`)
  }

  @SubscribeMessage('send-turn')
  handleMessage(@MessageBody() data: TicTacToeTurnPayload): WsResponse {
    this.logger.log(data)
    return { event: 'send-turn', data }
  }
}
