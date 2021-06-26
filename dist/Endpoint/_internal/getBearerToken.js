"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBearerToken = void 0;
function getBearerToken(headers) {
    if (headers == null || headers.authorization == null) {
        return undefined;
    }
    const authorization = headers.authorization;
    if (authorization.indexOf("Bearer") === -1) {
        return undefined;
    }
    return authorization.replace("Bearer ", "");
}
exports.getBearerToken = getBearerToken;
//# sourceMappingURL=getBearerToken.js.map