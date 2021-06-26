"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySendJsonEffect = void 0;
const zlib = require("zlib");
const acceptsGzipGivenEffectContext_1 = require("./acceptsGzipGivenEffectContext");
function gzipBufferGivenBuffer(buffer) {
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
async function applySendJsonEffect(effect, context) {
    const text = JSON.stringify(effect.content);
    const buffer = Buffer.from(text);
    context.res.setHeader("Content-Type", "application/json");
    const acceptsGzip = acceptsGzipGivenEffectContext_1.acceptsGzipGivenEffectContext(context);
    if (acceptsGzip) {
        const gzipBuffer = await gzipBufferGivenBuffer(buffer);
        context.res.setHeader("Content-Length", gzipBuffer.length);
        context.res.setHeader("Content-Encoding", "gzip");
        context.res.write(gzipBuffer);
    }
    else {
        context.res.setHeader("Content-Length", buffer.length);
        context.res.write(buffer);
    }
}
exports.applySendJsonEffect = applySendJsonEffect;
//# sourceMappingURL=applySendJsonEffect.js.map