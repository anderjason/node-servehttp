/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */
/// <reference types="node" />
import * as WebSocket from "ws";
import * as http from "http";
export declare function handleWebSocket(ws: WebSocket, req: http.IncomingMessage): void;
