import { Actor } from "skytree";
import { WebsocketServer } from "..";
import * as WebSocket from "ws";
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
export declare class WebsocketConnection extends Actor<WebsocketConnectionProps> {
    onActivate(): void;
    sendJson(obj: any): void;
    private onMessage;
    private onClose;
    private onError;
}
