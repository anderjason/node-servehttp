import { Actor } from "skytree";
import { WebsocketServer } from "..";
import * as WebSocket from "ws";
export interface WebsocketConnectionProps {
    websocketServer: WebsocketServer;
    ws: WebSocket;
    onReceiveMessage: (message: any) => void;
    onClosed: (connection: WebsocketConnection) => void;
}
export declare class WebsocketConnection extends Actor<WebsocketConnectionProps> {
    onActivate(): void;
    private onMessage;
    private onClose;
    private onError;
}
