"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const skytree_1 = require("skytree");
const http = require("http");
const url = require("url");
const observable_1 = require("@anderjason/observable");
const getRequestBody_1 = require("./_internal/getRequestBody");
const applyEndpointEffects_1 = require("./_internal/applyEndpointEffects");
const Session_1 = require("../Session");
const errorToEffects_1 = require("./_internal/errorToEffects");
const getHandler_1 = require("./_internal/getHandler");
const knownMethods = new Set(["GET", "PUT", "POST", "DELETE", "OPTIONS"]);
class HttpServer extends skytree_1.Actor {
    constructor() {
        super(...arguments);
        this._isListening = observable_1.Observable.givenValue(false, observable_1.Observable.isStrictEqual);
        this.isListening = observable_1.ReadOnlyObservable.givenObservable(this._isListening);
        this.handleRequest = async (req, res) => {
            try {
                const urlParts = url.parse(req.url, true);
                let params = undefined;
                const body = await getRequestBody_1.getRequestBody(req);
                if (body != null && typeof body === "object") {
                    params = Object.assign(Object.assign({}, urlParts.query), body);
                }
                else {
                    params = urlParts.query;
                }
                // const session = await tryGetSession(req);
                const session = new Session_1.Session();
                const headers = {};
                headers["Access-Control-Allow-Origin"] = "*";
                headers["Access-Control-Allow-Methods"] = "*";
                headers["Access-Control-Allow-Credentials"] = "true";
                headers["Access-Control-Allow-Headers"] = req.headers["access-control-request-headers"];
                Object.keys(req.headers).forEach((key) => {
                    const val = req.headers[key];
                    if (val != null) {
                        headers[key] = String(val);
                    }
                });
                let method = req.method;
                if (req.method === "HEAD") {
                    method = "GET";
                }
                if (!knownMethods.has(method)) {
                    throw new Error(`Unsupported method '${method}'`);
                }
                const endpointRequest = {
                    headers,
                    method,
                    relativePath: urlParts.pathname,
                    requestParams: params,
                    body: body,
                };
                const handler = getHandler_1.getHandler(req, this.props.endpoints, method, urlParts);
                let endpointEffects;
                try {
                    endpointEffects = await handler(endpointRequest);
                }
                catch (err) {
                    endpointEffects = errorToEffects_1.errorToEffects(err);
                }
                await applyEndpointEffects_1.applyEndpointEffects(endpointEffects, req, res, this.props.cacheDirectory, session);
            }
            catch (err) {
                console.error(err);
                res.statusCode = 500;
                res.end();
            }
        };
    }
    onActivate() {
        const httpServer = http.createServer(this.handleRequest);
        httpServer.listen(this.props.port, () => {
            this._isListening.setValue(true);
        });
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            httpServer.close(() => {
                this._isListening.setValue(false);
            });
        }));
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=index.js.map