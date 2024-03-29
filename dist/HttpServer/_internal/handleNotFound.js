"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = void 0;
function handleNotFound() {
    return Promise.resolve([
        {
            type: "mergeHeaders",
            headers: {
                "X-Served-By": "node-servehttp"
            }
        },
        {
            type: "setStatusCode",
            code: 404
        }
    ]);
}
exports.handleNotFound = handleNotFound;
//# sourceMappingURL=handleNotFound.js.map