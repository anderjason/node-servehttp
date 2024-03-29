import { Dict } from "@anderjason/observable";
import { LocalFile } from "@anderjason/node-filesystem";
import { OutgoingHttpHeaders } from "http2";
import { IncomingHttpHeaders } from "http2";
import { HttpMethod } from "../HttpServer";

export interface EndpointRequest<TParams = any, TBody = any> {
  body: TBody;
  headers: IncomingHttpHeaders;
  method: HttpMethod;
  relativePath: string;
  requestParams: TParams;
}

export interface SendJsonEffect<T = any> {
  type: "sendJson";
  content: T;
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

export type EndpointEffect<T = any> =
  | SendJsonEffect<T>
  | SendCustomBodyEffect
  | SendFileEffect
  | MergeHeadersEffect
  | MergeSessionPropertiesEffect
  | SetStatusCodeEffect
  | InvalidateEffect;

export type EndpointResponse<T = any> = EndpointEffect<T>[];

export type EndpointHandler = (
  request: EndpointRequest
) => Promise<EndpointResponse>;

interface EndpointDefinition {
  relativePath: string | RegExp;
  handleGet?: EndpointHandler;
  handlePost?: EndpointHandler;
  handleDelete?: EndpointHandler;
  handlePut?: EndpointHandler;
  handlePatch?: EndpointHandler;
}

export class Endpoint {
  readonly relativePath?: string | RegExp;
  readonly handleGet?: EndpointHandler;
  readonly handlePost?: EndpointHandler;
  readonly handleDelete?: EndpointHandler;
  readonly handlePut?: EndpointHandler;
  readonly handlePatch?: EndpointHandler;

  constructor(definition: EndpointDefinition) {
    this.relativePath = definition.relativePath;
    this.handleGet = definition.handleGet;
    this.handlePost = definition.handlePost;
    this.handlePut = definition.handlePut;
    this.handleDelete = definition.handleDelete;
    this.handlePatch = definition.handlePatch;
  }
}
