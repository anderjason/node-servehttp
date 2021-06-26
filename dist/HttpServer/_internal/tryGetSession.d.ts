/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */
/// <reference types="node" />
import * as http from "http";
import { Session } from "../../Session";
export declare function tryGetSession(req: http.IncomingMessage): Promise<Session | undefined>;
