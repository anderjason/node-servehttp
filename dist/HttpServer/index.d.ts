import { Actor } from "skytree";
import { ReadOnlyObservable } from "@anderjason/observable";
import { Endpoint } from "../Endpoint";
import { LocalDirectory } from "@anderjason/node-filesystem";
export declare type HttpMethod = "HEAD" | "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS";
export interface HttpServerProps {
    port: number;
    endpoints: Endpoint[];
    cacheDirectory: LocalDirectory;
}
export declare class HttpServer extends Actor<HttpServerProps> {
    private _isListening;
    readonly isListening: ReadOnlyObservable<boolean>;
    onActivate(): void;
    private handleRequest;
}
