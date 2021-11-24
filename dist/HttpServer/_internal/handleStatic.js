"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStatic = void 0;
const handleNotFound_1 = require("./handleNotFound");
function handleStatic(sharedFiles, fallbackFile) {
    if (sharedFiles == null && fallbackFile == null) {
        return handleNotFound_1.handleNotFound;
    }
    return async (req) => {
        var _a;
        const relativeUrl = req.relativePath.replace(/^\/?(.*)/, "$1");
        let serverAbsoluteFile;
        let publicFile;
        if (sharedFiles != null) {
            publicFile = sharedFiles.find((sf) => sf.toRelativeUrl() == relativeUrl);
        }
        if (publicFile != null) {
            serverAbsoluteFile = publicFile.toLocalFile();
        }
        else {
            const accept = (_a = req.headers["accept"]) !== null && _a !== void 0 ? _a : "";
            if (fallbackFile == null || !accept.includes("text/html")) {
                return (0, handleNotFound_1.handleNotFound)();
            }
            serverAbsoluteFile = fallbackFile;
        }
        return [
            {
                type: "sendFile",
                file: serverAbsoluteFile,
            },
        ];
    };
}
exports.handleStatic = handleStatic;
//# sourceMappingURL=handleStatic.js.map