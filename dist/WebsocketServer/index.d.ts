/// <reference types="node" />
import * as http from "http";
import { Actor } from "skytree";
import { TypedEvent } from "@anderjason/observable";
export interface WebsocketServerProps {
    httpServer: http.Server;
}
export declare class WebsocketServer extends Actor<WebsocketServerProps> {
    private _connections;
    readonly didReceiveMessage: TypedEvent<any>;
    onActivate(): void;
    private onConnectionClosed;
}
