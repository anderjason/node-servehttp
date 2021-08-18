"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketServer = void 0;
const WebSocket = require("ws");
const skytree_1 = require("skytree");
const WebsocketConnection_1 = require("./WebsocketConnection");
const observable_1 = require("@anderjason/observable");
class WebsocketServer extends skytree_1.Actor {
    constructor() {
        super(...arguments);
        this._connections = new Set();
        this.didReceiveMessage = new observable_1.TypedEvent();
    }
    onActivate() {
        const webSocketServer = new WebSocket.Server({
            server: this.props.httpServer,
        });
        webSocketServer.on("connection", (webSocket) => {
            this._connections.add(this.addActor(new WebsocketConnection_1.WebsocketConnection({
                websocketServer: this,
                ws: webSocket,
                onClosed: (connection) => this.onConnectionClosed(connection),
                onReceiveMessage: (message) => this.didReceiveMessage.emit(message),
            })));
        });
    }
    onConnectionClosed(connection) {
        this.removeActor(connection);
        this._connections.delete(connection);
    }
}
exports.WebsocketServer = WebsocketServer;
//# sourceMappingURL=index.js.map