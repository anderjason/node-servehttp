import { Actor } from "skytree";
import { WebsocketServer } from "..";
import * as WebSocket from "ws";
import { Receipt } from "@anderjason/observable";

export interface IncomingWebsocketMessage {
  connection: WebsocketConnection;
  data: any;
}

export interface WebsocketConnectionProps {
  websocketServer: WebsocketServer;
  ws: WebSocket;
  onReceiveMessage: (message: IncomingWebsocketMessage) => void;
  onClosed: (connection: WebsocketConnection) => void;
}

export class WebsocketConnection extends Actor<WebsocketConnectionProps> {
  onActivate() {
    const { ws } = this.props;

    ws.on("message", this.onMessage);
    ws.on("close", this.onClose);
    ws.on("error", this.onError);

    this.cancelOnDeactivate(
      new Receipt(() => {
        ws.off("message", this.onMessage);
        ws.off("close", this.onClose);
        ws.off("error", this.onError);
      })
    );
  }

  sendJson(obj: any) {
    this.props.ws.send(JSON.stringify(obj));
  }

  private onMessage = (messageData: any) => {
    this.props.onReceiveMessage({
      connection: this,
      data: JSON.parse(messageData)
    });
  }

  private onClose = () => {
    console.log("Client disconnected");
    this.props.onClosed(this);
  }

  private onError = (err: Error) => {
    console.error(err);
  }

}