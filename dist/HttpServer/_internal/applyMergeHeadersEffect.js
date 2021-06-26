"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMergeHeadersEffect = void 0;
async function applyMergeHeadersEffect(effect, context) {
    Object.keys(effect.headers).forEach(key => {
        const value = effect.headers[key];
        if (value != null) {
            context.res.setHeader(key, value);
        }
    });
}
exports.applyMergeHeadersEffect = applyMergeHeadersEffect;
//# sourceMappingURL=applyMergeHeadersEffect.js.map