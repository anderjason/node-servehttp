"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStatic = void 0;
const handleNotFound_1 = require("./handleNotFound");
function handleStatic(sharedFiles, fallbackFile) {
    if (sharedFiles == null && fallbackFile == null) {
        return handleNotFound_1.handleNotFound;
    }
    return async (req) => {
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
            if (fallbackFile == null) {
                return handleNotFound_1.handleNotFound();
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