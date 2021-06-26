/// <reference types="node" />
import * as http from "http";
import * as url from "url";
import { Endpoint, EndpointHandler } from "../../Endpoint";
import { HttpMethod } from "..";
export declare function getHandler(request: http.IncomingMessage, endpoints: Endpoint[], method: HttpMethod, urlParts: url.Url): EndpointHandler;
