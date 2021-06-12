import { Dict } from "@anderjason/observable";
import { LocalFile } from "@anderjason/node-filesystem";
import { OutgoingHttpHeaders } from "http2";
import { IncomingHttpHeaders } from "http2";
import { HttpMethod } from "../HttpServer";

export interface EndpointRequest {
  body: any | undefined;
  headers: IncomingHttpHeaders;
  method: HttpMethod;
  relativePath: string;
  requestParams: Dict<any>;
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

export type EndpointEffect =
  | SendJsonEffect
  | SendCustomBodyEffect
  | SendFileEffect
  | MergeHeadersEffect
  | MergeSessionPropertiesEffect
  | SetStatusCodeEffect
  | InvalidateEffect;

export type EndpointHandler = (
  request: EndpointRequest
) => Promise<EndpointEffect[]>;

interface MethodHandlers {
  
}

interface EndpointDefinition {
  relativePath: string | RegExp;
  handleGet?: EndpointHandler;
  handlePost?: EndpointHandler;
  handleDelete?: EndpointHandler;
  handlePut?: EndpointHandler;
}

export class Endpoint {
  readonly relativePath?: string | RegExp;
  readonly handleGet?: EndpointHandler;
  readonly handlePost?: EndpointHandler;
  readonly handleDelete?: EndpointHandler;
  readonly handlePut?: EndpointHandler;

  constructor(definition: EndpointDefinition) {
    this.relativePath = definition.relativePath;
    this.handleGet = definition.handleGet;
    this.handlePost = definition.handlePost;
    this.handlePut = definition.handlePut;
    this.handleDelete = definition.handleDelete;
  }
}
