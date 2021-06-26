"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSharedFile = void 0;
class HttpSharedFile {
    constructor(localFile, relativeUrlParts) {
        this._relativeUrlParts = relativeUrlParts;
        this._localFile = localFile;
    }
    static givenLocalFile(localFile, ...relativeUrlParts) {
        return new HttpSharedFile(localFile, relativeUrlParts);
    }
    toLocalFile() {
        return this._localFile;
    }
    toRelativeUrlParts() {
        return this._relativeUrlParts;
    }
    toRelativeUrl() {
        return this._relativeUrlParts.join("/");
    }
}
exports.HttpSharedFile = HttpSharedFile;
//# sourceMappingURL=index.js.map