"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyEndpointEffects = void 0;
const util_1 = require("@anderjason/util");
const applyMergeHeadersEffect_1 = require("./applyMergeHeadersEffect");
const applyMergeSessionPropertiesEffect_1 = require("./applyMergeSessionPropertiesEffect");
const applySendCustomBodyEffect_1 = require("./applySendCustomBodyEffect");
const applySendFileEffect_1 = require("./applySendFileEffect");
const applySendJsonEffect_1 = require("./applySendJsonEffect");
const applySetStatusCodeEffect_1 = require("./applySetStatusCodeEffect");
const cookieHeader_1 = require("./cookieHeader");
const startSession_1 = require("./startSession");
async function ensureSession(currentSession, res) {
    if (currentSession != null) {
        return currentSession;
    }
    const session = await startSession_1.startSession();
    res.setHeader("Set-Cookie", cookieHeader_1.cookieHeader("session", session.sessionKey) // TODO configure cookie name
    );
    return session;
}
async function applyEndpointEffects(endpointEffects, req, res, cacheDirectory, currentSession) {
    const session = await ensureSession(currentSession, res);
    const context = {
        session,
        req,
        res,
    };
    const needsDefaultStatusCode = !endpointEffects.some((e) => e.type === "setStatusCode" ||
        e.type === "sendJson" ||
        e.type === "sendCustomBody" ||
        e.type === "sendFile");
    if (needsDefaultStatusCode) {
        res.statusCode = 204;
    }
    else {
        res.statusCode = 200;
    }
    endpointEffects.unshift({
        type: "mergeHeaders",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": req.headers["access-control-request-headers"] || "Content-Type",
        },
    });
    try {
        await util_1.PromiseUtil.asyncSequenceGivenArrayAndCallback(endpointEffects, async (effect) => {
            switch (effect.type) {
                case "mergeHeaders":
                    await applyMergeHeadersEffect_1.applyMergeHeadersEffect(effect, context);
                    break;
                case "mergeSessionProperties":
                    await applyMergeSessionPropertiesEffect_1.applyMergeSessionPropertiesEffect(effect, context);
                    break;
                case "setStatusCode":
                    await applySetStatusCodeEffect_1.applySetStatusCodeEffect(effect, context);
                    break;
                case "sendJson":
                    if (req.method !== "HEAD") {
                        await applySendJsonEffect_1.applySendJsonEffect(effect, context);
                    }
                    break;
                case "sendCustomBody":
                    if (req.method !== "HEAD") {
                        await applySendCustomBodyEffect_1.applySendCustomBodyEffect(effect, context);
                    }
                    break;
                case "sendFile":
                    if (req.method !== "HEAD") {
                        await applySendFileEffect_1.applySendFileEffect(effect, context, cacheDirectory);
                    }
                    break;
                default:
                    throw new Error("Unsupported effect type");
            }
        });
    }
    catch (err) {
        console.error(err);
        res.statusCode = 500;
    }
    res.end();
}
exports.applyEndpointEffects = applyEndpointEffects;
//# sourceMappingURL=applyEndpointEffects.js.map