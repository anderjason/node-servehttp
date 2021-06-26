/// <reference types="node" />
import * as http from "http";
export declare function getRequestBodyString(req: http.IncomingMessage): Promise<string | undefined>;
export declare function getRequestBody(req: http.IncomingMessage): Promise<any | undefined>;
