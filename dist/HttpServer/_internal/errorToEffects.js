"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorToEffects = void 0;
function errorToEffects(err) {
    console.error(err);
    return [
        {
            type: "sendJson",
            content: {
                errorDescription: err.message
            }
        }
    ];
}
exports.errorToEffects = errorToEffects;
//# sourceMappingURL=errorToEffects.js.map