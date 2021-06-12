import { SendCustomBodyEffect } from "../../Endpoint";
import { EffectContext } from "./applyEndpointEffects";

export async function applySendCustomBodyEffect(
  effect: SendCustomBodyEffect,
  context: EffectContext
): Promise<void> {
  let contentLength = Buffer.isBuffer(effect.content)
    ? effect.content.length
    : Buffer.from(effect.content).length;

  context.res.setHeader("Content-Type", effect.contentType);
  context.res.setHeader("Content-Length", contentLength);

  context.res.write(effect.content);
}
