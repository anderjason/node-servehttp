/// <reference types="node" />
import * as http from "http";
import { EndpointEffect } from "../../Endpoint";
import { Session } from "../../Session";
import { LocalDirectory } from "@anderjason/node-filesystem";
export interface EffectContext {
    session: Session;
    req: http.IncomingMessage;
    res: http.ServerResponse;
}
export declare function applyEndpointEffects(endpointEffects: EndpointEffect[], req: http.IncomingMessage, res: http.ServerResponse, cacheDirectory: LocalDirectory, currentSession?: Session): Promise<void>;
