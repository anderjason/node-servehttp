/// <reference types="node" />
import { Dict } from "@anderjason/observable";
import { LocalFile } from "@anderjason/node-filesystem";
import { OutgoingHttpHeaders } from "http2";
import { IncomingHttpHeaders } from "http2";
import { HttpMethod } from "../HttpServer";
export interface EndpointRequest<TParams = Dict<unknown>, TBody = unknown> {
    body: TBody;
    headers: IncomingHttpHeaders;
    method: HttpMethod;
    relativePath: string;
    requestParams: TParams;
}
export interface SendJsonEffect {
    type: "sendJson";
    content: any;
}
export interface SendCustomBodyEffect {
    type: "sendCustomBody";
    contentType: string;
    content: string | Buffer;
}
export interface SendFileEffect {
    type: "sendFile";
    file: LocalFile;
}
export interface MergeHeadersEffect {
    type: "mergeHeaders";
    headers: OutgoingHttpHeaders;
}
export interface MergeSessionPropertiesEffect {
    type: "mergeSessionProperties";
    properties: Dict<string>;
}
export interface SetStatusCodeEffect {
    type: "setStatusCode";
    code: number;
}
export interface InvalidateEffect {
    type: "invalidate";
    endpoints: string[];
}
export declare type EndpointEffect = SendJsonEffect | SendCustomBodyEffect | SendFileEffect | MergeHeadersEffect | MergeSessionPropertiesEffect | SetStatusCodeEffect | InvalidateEffect;
export declare type EndpointHandler = (request: EndpointRequest) => Promise<EndpointEffect[]>;
interface EndpointDefinition {
    relativePath: string | RegExp;
    handleGet?: EndpointHandler;
    handlePost?: EndpointHandler;
    handleDelete?: EndpointHandler;
    handlePut?: EndpointHandler;
}
export declare class Endpoint {
    readonly relativePath?: string | RegExp;
    readonly handleGet?: EndpointHandler;
    readonly handlePost?: EndpointHandler;
    readonly handleDelete?: EndpointHandler;
    readonly handlePut?: EndpointHandler;
    constructor(definition: EndpointDefinition);
}
export {};
