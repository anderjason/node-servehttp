import { LocalFile } from "@anderjason/node-filesystem";
import { EndpointEffect, EndpointRequest } from "../../Endpoint";
import { HttpSharedFile } from "../../HttpSharedFile";
export declare function handleStatic(sharedFiles?: HttpSharedFile[], fallbackFile?: LocalFile): (req: EndpointRequest) => Promise<EndpointEffect[]>;
