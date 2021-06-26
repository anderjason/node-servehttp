"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptsGzipGivenEffectContext = void 0;
function acceptsGzipGivenEffectContext(context) {
    if (context == null) {
        throw new Error("Context is required");
    }
    if (context.req == null) {
        throw new Error("Context is missing a request");
    }
    if (context.req.headers == null) {
        throw new Error("Context request is missing headers");
    }
    const acceptEncodingHeader = context.req.headers["accept-encoding"] || "identity";
    return (acceptEncodingHeader.includes("gzip") || acceptEncodingHeader.includes("*"));
}
exports.acceptsGzipGivenEffectContext = acceptsGzipGivenEffectContext;
//# sourceMappingURL=acceptsGzipGivenEffectContext.js.map