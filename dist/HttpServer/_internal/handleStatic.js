"use strict";
/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStatic = void 0;
async function handleStatic(req) {
    // TODO
    return [];
    // const publicDirectory = LocalDirectory.givenRelativePath(
    //   RunContext.instance.mainDirectory,
    //   "public"
    // );
    // const relativeUrl = req.relativePath.replace(/^\/?(.*)/, "$1");
    // let serverAbsoluteFile: LocalFile;
    // const publicFile = HttpSharedFile.registry.toOptionalValueHavingKey(
    //   relativeUrl
    // );
    // if (publicFile != null) {
    //   serverAbsoluteFile = publicFile.toLocalFile();
    // } else {
    //   serverAbsoluteFile = LocalFile.givenRelativePath(
    //     publicDirectory,
    //     "index.html"
    //   );
    // }
    // return [
    //   {
    //     type: "sendFile",
    //     file: serverAbsoluteFile,
    //   } as SendFileEffect,
    // ];
}
exports.handleStatic = handleStatic;
//# sourceMappingURL=handleStatic.js.map