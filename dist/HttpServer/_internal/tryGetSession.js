"use strict";
/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGetSession = void 0;
const getCookies_1 = require("./getCookies");
function tryGetSession(req) {
    const cookies = (0, getCookies_1.getCookies)(req.headers["cookie"]);
    const sessionKey = cookies.session; // TODO configurable cookie name
    if (sessionKey == null) {
        return Promise.resolve(undefined);
    }
    // TODO get session
    // return Sessions.toOptionalFirstRow({
    //   columns: {
    //     sessionKey
    //   }
    // });
}
exports.tryGetSession = tryGetSession;
//# sourceMappingURL=tryGetSession.js.map