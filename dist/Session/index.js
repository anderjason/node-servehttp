"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const node_crypto_1 = require("@anderjason/node-crypto");
class Session {
    // TODO
    constructor(sessionKey) {
        this.sessionKey = sessionKey || node_crypto_1.UniqueId.ofRandom().toUUIDString();
    }
}
exports.Session = Session;
//# sourceMappingURL=index.js.map