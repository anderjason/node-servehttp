import { Actor } from "skytree";
import { ReadOnlyObservable } from "@anderjason/observable";
import { Endpoint } from "../Endpoint";
import { LocalDirectory, LocalFile } from "@anderjason/node-filesystem";
import { WebsocketServer } from "../WebsocketServer";
import { HttpSharedFile } from "../HttpSharedFile";
export declare type HttpMethod = "HEAD" | "GET" | "PUT" | "POST" | "PATCH" | "DELETE" | "OPTIONS";
export interface HttpServerProps {
    port: number;
    endpoints: Endpoint[];
    cacheDirectory: LocalDirectory;
    staticDirectory?: LocalDirectory;
    sharedFiles?: HttpSharedFile[];
    fallbackFile?: LocalFile;
    host?: string;
}
export declare class HttpServer extends Actor<HttpServerProps> {
    private _isListening;
    readonly isListening: ReadOnlyObservable<boolean>;
    private _websocketServer;
    private _sharedFiles;
    get websocketServer(): WebsocketServer;
    onActivate(): void;
    private getSharedFiles;
    private handleRequest;
}
