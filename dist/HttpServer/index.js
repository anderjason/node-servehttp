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
const WebsocketServer_1 = require("../WebsocketServer");
const HttpSharedFile_1 = require("../HttpSharedFile");
const knownMethods = new Set([
    "GET",
    "PUT",
    "POST",
    "DELETE",
    "OPTIONS",
]);
class HttpServer extends skytree_1.Actor {
    constructor() {
        super(...arguments);
        this._isListening = observable_1.Observable.givenValue(false, observable_1.Observable.isStrictEqual);
        this.isListening = observable_1.ReadOnlyObservable.givenObservable(this._isListening);
        this.handleRequest = async (req, res) => {
            try {
                const urlParts = url.parse(req.url, true);
                let params = undefined;
                const body = await (0, getRequestBody_1.getRequestBody)(req);
                if (body != null && typeof body === "object") {
                    params = Object.assign(Object.assign({}, urlParts.query), body);
                }
                else {
                    params = urlParts.query;
                }
                // const session = await tryGetSession(req);
                const session = new Session_1.Session();
                const headers = {};
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
                const sharedFiles = await this.getSharedFiles();
                const handler = (0, getHandler_1.getHandler)(req, this.props.endpoints, sharedFiles, this.props.fallbackFile, method, urlParts);
                let endpointEffects;
                try {
                    endpointEffects = await handler(endpointRequest);
                }
                catch (err) {
                    endpointEffects = (0, errorToEffects_1.errorToEffects)(err);
                }
                await (0, applyEndpointEffects_1.applyEndpointEffects)(endpointEffects, req, res, this.props.cacheDirectory, session);
            }
            catch (err) {
                console.error(err);
                res.statusCode = 500;
                res.end();
            }
        };
    }
    get websocketServer() {
        return this._websocketServer;
    }
    onActivate() {
        const httpServer = http.createServer(this.handleRequest);
        this._websocketServer = this.addActor(new WebsocketServer_1.WebsocketServer({
            httpServer,
        }));
        httpServer.listen(this.props.port, () => {
            this._isListening.setValue(true);
        });
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            httpServer.close(() => {
                this._isListening.setValue(false);
            });
        }));
    }
    async getSharedFiles() {
        var _a;
        const { staticDirectory } = this.props;
        if (this._sharedFiles == null) {
            this._sharedFiles = (_a = this.props.sharedFiles) !== null && _a !== void 0 ? _a : [];
            if (staticDirectory != null) {
                const staticFiles = await staticDirectory.toDescendantFiles();
                for (const file of staticFiles) {
                    const relativePath = staticDirectory.toRelativePathParts(file);
                    if (relativePath.some(p => p === ".DS_Store")) {
                        continue;
                    }
                    this._sharedFiles.push(HttpSharedFile_1.HttpSharedFile.givenLocalFile(file, ...relativePath));
                }
            }
        }
        return this._sharedFiles;
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=index.js.map