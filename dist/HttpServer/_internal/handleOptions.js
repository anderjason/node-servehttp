"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
async function handleOptions() {
    return [
        {
            type: "mergeHeaders",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        }
    ];
}
exports.handleOptions = handleOptions;
//# sourceMappingURL=handleOptions.js.map