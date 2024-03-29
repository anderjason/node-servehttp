"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySendFileEffect = void 0;
const send = require("send");
const zlib = require("zlib");
const node_crypto_1 = require("@anderjason/node-crypto");
const node_filesystem_1 = require("@anderjason/node-filesystem");
const acceptsGzipGivenEffectContext_1 = require("./acceptsGzipGivenEffectContext");
async function gzipFile(inputFile, targetFile) {
    const inputBuffer = await inputFile.toContentBuffer();
    return new Promise((resolve, reject) => {
        zlib.gzip(inputBuffer, async (err, gzipBuffer) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                await targetFile.toDirectory().createDirectory();
                await targetFile.writeFile(gzipBuffer);
                resolve();
            }
            catch (err) {
                reject(err);
                return;
            }
        });
    });
}
async function applySendFileEffect(effect, context, cacheDirectory) {
    const filename = effect.file.toAbsolutePath();
    const size = await effect.file.toSize();
    const modifiedAt = await effect.file.toModifiedInstant();
    let cacheFile;
    if (cacheDirectory != null) {
        const cacheKey = node_crypto_1.UnsaltedHash.givenUnhashedString(`${filename}:${size.toBytes()}:${modifiedAt.toEpochMilliseconds()}`).toHashedString();
        cacheFile = node_filesystem_1.LocalFile.givenRelativePath(cacheDirectory, cacheKey.slice(0, 2), cacheKey.slice(0, 24) + effect.file.toExtension());
        const isAvailable = await cacheFile.isAccessible();
        if (!isAvailable) {
            await gzipFile(effect.file, cacheFile);
        }
    }
    const acceptsGzip = cacheFile != null && (0, acceptsGzipGivenEffectContext_1.acceptsGzipGivenEffectContext)(context);
    return new Promise((resolve, reject) => {
        const selectedFile = acceptsGzip ? cacheFile : effect.file;
        // create send stream
        const stream = send(context.req, selectedFile.toAbsolutePath());
        if (acceptsGzip) {
            stream.on("headers", (res, path, stat) => {
                res.setHeader("Content-Encoding", "gzip");
            });
        }
        // add directory handler
        stream.on("directory", () => {
            try {
                context.res.statusCode = 404;
                resolve();
                return;
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
        // forward errors
        stream.on("error", (err) => {
            console.error(err);
            try {
                reject(err);
                return;
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
        stream.on("end", () => {
            resolve();
        });
        // pipe
        stream.pipe(context.res);
    });
}
exports.applySendFileEffect = applySendFileEffect;
//# sourceMappingURL=applySendFileEffect.js.map