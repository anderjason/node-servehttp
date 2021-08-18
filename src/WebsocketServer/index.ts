import * as http from "http";
import * as WebSocket from "ws";
import { Actor } from "skytree";
import { IncomingWebsocketMessage, WebsocketConnection } from "./WebsocketConnection";
import { TypedEvent } from "@anderjason/observable";

export interface WebsocketServerProps {
  httpServer: http.Server;
}

export class WebsocketServer extends Actor<WebsocketServerProps> {
  private _connections = new Set<WebsocketConnection>();

  readonly didReceiveMessage = new TypedEvent<IncomingWebsocketMessage>();

  onActivate() {
    const webSocketServer = new WebSocket.Server({
      server: this.props.httpServer,
    });
    
    webSocketServer.on("connection", (webSocket: WebSocket) => {
      this._connections.add(
        this.addActor(
          new WebsocketConnection({
            websocketServer: this,
            ws: webSocket,
            onClosed: (connection) => this.onConnectionClosed(connection),
            onReceiveMessage: (message) => this.didReceiveMessage.emit(message),
          })
        )
      );
    });
  }

  private onConnectionClosed(connection: WebsocketConnection) {
    this.removeActor(connection);
    this._connections.delete(connection);
  }
}
