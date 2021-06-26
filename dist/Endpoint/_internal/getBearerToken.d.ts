/// <reference types="node" />
import { IncomingHttpHeaders } from "http2";
export declare function getBearerToken(headers: IncomingHttpHeaders): string | undefined;
