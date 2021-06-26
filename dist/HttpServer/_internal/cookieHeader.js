"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieHeader = void 0;
function cookieHeader(key, value) {
    const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    if (!fieldContentRegExp.test(key)) {
        throw new TypeError("Invalid cookie key");
    }
    const encodedValue = encodeURIComponent(value);
    if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
        throw new TypeError("Invalid cookie value");
    }
    return `${key}=${value}; path=/; HttpOnly`;
}
exports.cookieHeader = cookieHeader;
//# sourceMappingURL=cookieHeader.js.map