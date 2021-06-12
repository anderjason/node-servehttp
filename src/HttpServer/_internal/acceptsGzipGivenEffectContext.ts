import { EffectContext } from "./applyEndpointEffects";

export function acceptsGzipGivenEffectContext(context: EffectContext): boolean {
  if (context == null) {
    throw new Error("Context is required");
  }

  if (context.req == null) {
    throw new Error("Context is missing a request");
  }

  if (context.req.headers == null) {
    throw new Error("Context request is missing headers");
  }

  const acceptEncodingHeader =
    context.req.headers["accept-encoding"] || "identity";

  return (
    acceptEncodingHeader.includes("gzip") || acceptEncodingHeader.includes("*")
  );
}
