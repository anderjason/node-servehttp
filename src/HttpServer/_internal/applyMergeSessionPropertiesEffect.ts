/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */

import { MergeSessionPropertiesEffect } from "../../Endpoint";
import { EffectContext } from "./applyEndpointEffects";
import { Session } from "../../Session";

export async function applyMergeSessionPropertiesEffect(
  effect: MergeSessionPropertiesEffect,
  context: EffectContext
): Promise<void> {
  // TODO

  // const mergedData = {
  //   ...context.session.data,
  //   ...effect.properties
  // };

  // return Sessions.toUpdatePromise(context.session.id!, {
  //   data: mergedData
  // })
  //   .then(() => {
  //     return Sessions.toRowHavingId(context.session.id!);
  //   })
  //   .then(session => {
  //     context.session = session;
  //   });
}
