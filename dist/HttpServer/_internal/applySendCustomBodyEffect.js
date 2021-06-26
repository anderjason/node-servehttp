"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySendCustomBodyEffect = void 0;
async function applySendCustomBodyEffect(effect, context) {
    let contentLength = Buffer.isBuffer(effect.content)
        ? effect.content.length
        : Buffer.from(effect.content).length;
    context.res.setHeader("Content-Type", effect.contentType);
    context.res.setHeader("Content-Length", contentLength);
    context.res.write(effect.content);
}
exports.applySendCustomBodyEffect = applySendCustomBodyEffect;
//# sourceMappingURL=applySendCustomBodyEffect.js.map