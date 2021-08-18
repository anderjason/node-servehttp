"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketConnection = void 0;
const skytree_1 = require("skytree");
const observable_1 = require("@anderjason/observable");
class WebsocketConnection extends skytree_1.Actor {
    onActivate() {
        const { ws } = this.props;
        ws.on("message", this.onMessage);
        ws.on("close", this.onClose);
        ws.on("error", this.onError);
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            ws.off("message", this.onMessage);
            ws.off("close", this.onClose);
            ws.off("error", this.onError);
        }));
    }
    onMessage(messageData) {
        console.log("message", messageData);
        this.props.onReceiveMessage(JSON.parse(messageData));
    }
    onClose() {
        console.log("Client disconnected");
        this.props.onClosed(this);
    }
    onError(err) {
        console.error(err);
    }
}
exports.WebsocketConnection = WebsocketConnection;
//# sourceMappingURL=index.js.map