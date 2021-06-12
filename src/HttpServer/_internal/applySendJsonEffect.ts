import * as zlib from "zlib";
import { SendJsonEffect } from "../../Endpoint";
import { acceptsGzipGivenEffectContext } from "./acceptsGzipGivenEffectContext";
import { EffectContext } from "./applyEndpointEffects";

function gzipBufferGivenBuffer(buffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    zlib.gzip(buffer, (err, gzipBuffer) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(gzipBuffer);
    });
  });
}

export async function applySendJsonEffect(
  effect: SendJsonEffect,
  context: EffectContext
): Promise<void> {
  const text = JSON.stringify(effect.content);
  const buffer = Buffer.from(text);

  context.res.setHeader("Content-Type", "application/json");

  const acceptsGzip = acceptsGzipGivenEffectContext(context);
  if (acceptsGzip) {
    const gzipBuffer = await gzipBufferGivenBuffer(buffer);
    context.res.setHeader("Content-Length", gzipBuffer.length);
    context.res.setHeader("Content-Encoding", "gzip");
    context.res.write(gzipBuffer);
  } else {
    context.res.setHeader("Content-Length", buffer.length);
    context.res.write(buffer);
  }
}
