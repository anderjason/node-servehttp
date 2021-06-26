"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const handleNotFound_1 = require("./handleNotFound");
function optionalEndpointHavingRelativePath(relativePath, endpoints) {
    return endpoints.find(e => {
        const endpointRelativePath = e.relativePath;
        if (endpointRelativePath === relativePath) {
            return true;
        }
        if (endpointRelativePath instanceof RegExp) {
            return endpointRelativePath.test(relativePath);
        }
        return false;
    });
}
function getHandler(request, endpoints, method, urlParts) {
    if (urlParts.pathname == null) {
        return handleNotFound_1.handleNotFound;
    }
    let requestRelativePath = urlParts.pathname;
    if (requestRelativePath.startsWith("/")) {
        requestRelativePath = requestRelativePath.substr(1);
    }
    let endpoint = optionalEndpointHavingRelativePath(requestRelativePath, endpoints);
    if (endpoint == null) {
        if (endpoint == null) {
            return handleNotFound_1.handleNotFound;
        }
    }
    let handler = undefined;
    switch (method) {
        case "GET":
            handler = endpoint.handleGet;
            break;
        case "DELETE":
            handler = endpoint.handleDelete;
            break;
        case "PUT":
            handler = endpoint.handlePut;
            break;
        case "POST":
            handler = endpoint.handlePost;
            break;
        default:
            break;
    }
    if (handler == null) {
        handler = handleNotFound_1.handleNotFound;
    }
    return handler;
}
exports.getHandler = getHandler;
//# sourceMappingURL=getHandler.js.map