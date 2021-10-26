"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = exports.getRequestBodyString = void 0;
const objectGivenQueryString_1 = require("./objectGivenQueryString");
function getRequestBodyString(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            resolve(body);
        });
        req.on("error", (err) => {
            reject(err);
        });
    });
}
exports.getRequestBodyString = getRequestBodyString;
function getRequestBody(req) {
    return getRequestBodyString(req).then((body) => {
        if (body == null) {
            return undefined;
        }
        // everything up to an optional semicolon
        const requestContentType = (req.headers["content-type"] || "").replace(/^(.*?);.*/, "$1");
        switch (requestContentType) {
            case "application/json":
                return JSON.parse(body);
            case "application/x-www-form-urlencoded":
                return (0, objectGivenQueryString_1.objectGivenQueryString)(body);
            default:
                return body;
        }
    });
}
exports.getRequestBody = getRequestBody;
//# sourceMappingURL=getRequestBody.js.map