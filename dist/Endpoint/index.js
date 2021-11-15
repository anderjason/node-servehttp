"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
class Endpoint {
    constructor(definition) {
        this.relativePath = definition.relativePath;
        this.handleGet = definition.handleGet;
        this.handlePost = definition.handlePost;
        this.handlePut = definition.handlePut;
        this.handleDelete = definition.handleDelete;
        this.handlePatch = definition.handlePatch;
    }
}
exports.Endpoint = Endpoint;
//# sourceMappingURL=index.js.map