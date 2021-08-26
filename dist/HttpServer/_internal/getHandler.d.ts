/// <reference types="node" />
import * as http from "http";
import * as url from "url";
import { Endpoint, EndpointHandler } from "../../Endpoint";
import { HttpMethod } from "..";
import { HttpSharedFile } from "../../HttpSharedFile";
import { LocalFile } from "@anderjason/node-filesystem";
export declare function getHandler(request: http.IncomingMessage, endpoints: Endpoint[], sharedFiles: HttpSharedFile[], fallbackFile: LocalFile, method: HttpMethod, urlParts: url.Url): EndpointHandler;
