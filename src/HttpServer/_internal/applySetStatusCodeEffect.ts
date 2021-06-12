import { SetStatusCodeEffect } from "../../Endpoint";
import { EffectContext } from "./applyEndpointEffects";

export async function applySetStatusCodeEffect(
  effect: SetStatusCodeEffect,
  context: EffectContext
): Promise<void> {
  context.res.statusCode = effect.code;
}
