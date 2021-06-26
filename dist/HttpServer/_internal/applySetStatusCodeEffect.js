"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySetStatusCodeEffect = void 0;
async function applySetStatusCodeEffect(effect, context) {
    context.res.statusCode = effect.code;
}
exports.applySetStatusCodeEffect = applySetStatusCodeEffect;
//# sourceMappingURL=applySetStatusCodeEffect.js.map