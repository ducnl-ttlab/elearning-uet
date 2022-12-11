import {
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/common/filter/ws-catch-all-filter';
import { SocketWithAuth } from 'src/common/interfaces';
import { PollService } from './poll.service';

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: '',
  cors: {
    origin: '*',
  },
})
export class PollGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(PollGateway.name);
  constructor(private readonly pollsService: PollService) {}

  @WebSocketServer() io: Namespace;

  // Gateway initialized (provided in module and instantiated)
  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  async handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with userID: ${client.userID}, pollID: ${client.email}, and name: "${client.username}"`,
    );

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    const { id, userID, username, email, role } = client;

    let user = {
      id,
      userID,
      email,
      username,
      role,
    };
    let users = this.pollsService.joinPoll(user);

    this.io.emit('users', {
      users,
    });

    this.logger.debug(`Number of connected sockets: ${users.length}`);

    // const roomName = client.userID;
    // await client.join(roomName);
    // const connectedClients = this.io.adapter.rooms?.get(roomName)?.size;

    // this.logger.debug(
    //   `userID: ${client.userID} joined room with name: ${roomName}`,
    // );
    // this.logger.debug(
    //   `Total clients connected to room '${roomName}': ${connectedClients}`,
    // );

    // const updatedPoll = await this.pollsService.addParticipant({
    //   pollID: client.pollID,
    //   userID: client.userID,
    //   name: client.name,
    // });

    // this.io.to(roomName).emit('poll_updated', updatedPoll);
  }

  @SubscribeMessage('notification')
  async notification(
    @MessageBody() data: { title: string; description: string },
  ) {
    this.io.emit('notification', data);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.io.emit('identity', data);
    return data;
  }

  @SubscribeMessage('events')
  async events(@MessageBody() data: number): Promise<number> {
    this.io.emit('events', data);
    return data;
  }

  async handleDisconnect(client: SocketWithAuth) {
    let users = this.pollsService.userLeave(client.userID);
    this.io.emit('users', {
      users,
    });

    this.logger.debug(
      `Socket Disconnected with userID: ${client.userID}, pollID: ${client.email}, and name: "${client.username}"`,
    );
    this.logger.debug(`Number of connected sockets: ${users.length}`);
  }
}
