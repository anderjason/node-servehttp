/// <reference types="node" />
import * as http from "http";
import { Actor } from "skytree";
import { IncomingWebsocketMessage } from "./WebsocketConnection";
import { TypedEvent } from "@anderjason/observable";
export interface WebsocketServerProps {
    httpServer: http.Server;
}
export declare class WebsocketServer extends Actor<WebsocketServerProps> {
    private _connections;
    readonly didReceiveMessage: TypedEvent<IncomingWebsocketMessage>;
    onActivate(): void;
    broadcastJson(obj: any): void;
    private onConnectionClosed;
}
