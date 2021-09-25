import type { TicTacToeTurnPayload } from '../../../types';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('send-turn')
  handleMessage(@MessageBody() data: TicTacToeTurnPayload) {
    return data;
  }
}
