import { MergeHeadersEffect } from "../../Endpoint";
import { EffectContext } from "./applyEndpointEffects";

export async function applyMergeHeadersEffect(
  effect: MergeHeadersEffect,
  context: EffectContext
): Promise<void> {
  Object.keys(effect.headers).forEach(key => {
    const value = effect.headers[key];

    if (value != null) {
      context.res.setHeader(key, value);
    }
  });
}
