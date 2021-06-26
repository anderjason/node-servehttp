import { SendFileEffect } from "../../Endpoint";
import { LocalDirectory } from "@anderjason/node-filesystem";
import { EffectContext } from "./applyEndpointEffects";
export declare function applySendFileEffect(effect: SendFileEffect, context: EffectContext, cacheDirectory: LocalDirectory): Promise<void>;
