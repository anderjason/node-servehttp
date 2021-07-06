"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
async function handleOptions() {
    return [
        {
            type: "mergeHeaders",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
    ];
}
exports.handleOptions = handleOptions;
//# sourceMappingURL=handleOptions.js.map