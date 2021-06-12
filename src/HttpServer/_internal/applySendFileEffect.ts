import * as send from "send";
import * as zlib from "zlib";
import { SendFileEffect } from "../../Endpoint";
import { UnsaltedHash } from "@anderjason/node-crypto";
import { LocalDirectory } from "@anderjason/node-filesystem";
import { LocalFile } from "@anderjason/node-filesystem";
import { acceptsGzipGivenEffectContext } from "./acceptsGzipGivenEffectContext";
import { EffectContext } from "./applyEndpointEffects";

async function gzipFile(
  inputFile: LocalFile,
  targetFile: LocalFile
): Promise<void> {
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
      } catch (err) {
        reject(err);
        return;
      }
    });
  });
}

export async function applySendFileEffect(
  effect: SendFileEffect,
  context: EffectContext,
  cacheDirectory: LocalDirectory
): Promise<void> {
  // TODO
  
  // const filename = effect.file.toAbsolutePath();
  // const size = await effect.file.toSize();
  // const modifiedAt = await effect.file.toModifiedInstant();

  // const cacheKey = UnsaltedHash.givenUnhashedString(
  //   `${filename}:${size.toBytes()}:${modifiedAt.toEpochMilliseconds()}`
  // ).toHashedString();

  // const cacheFile = LocalFile.givenRelativePath(
  //   cacheDirectory,
  //   cacheKey.slice(0, 2),
  //   cacheKey.slice(0, 24) + effect.file.toExtension()
  // );

  // const isAvailable = await cacheFile.isAccessible();
  // if (!isAvailable) {
  //   await gzipFile(effect.file, cacheFile);
  // }

  // const acceptsGzip = acceptsGzipGivenEffectContext(context);

  // return new Promise((resolve, reject) => {
  //   const selectedFile = acceptsGzip ? cacheFile : effect.file;

  //   // create send stream
  //   const stream = send(context.req, selectedFile.toAbsolutePath());

  //   if (acceptsGzip) {
  //     stream.on("headers", (res, path, stat) => {
  //       res.setHeader("Content-Encoding", "gzip");
  //     });
  //   }

  //   // add directory handler
  //   stream.on("directory", () => {
  //     try {
  //       context.res.statusCode = 404;
  //       resolve();
  //       return;
  //     } catch (err) {
  //       console.error(err);
  //       reject(err);
  //     }
  //   });

  //   // forward errors
  //   stream.on("error", (err) => {
  //     console.error(err);

  //     try {
  //       reject(err);
  //       return;
  //     } catch (err) {
  //       console.error(err);
  //       reject(err);
  //     }
  //   });

  //   stream.on("end", () => {
  //     resolve();
  //   });

  //   // pipe
  //   stream.pipe(context.res);
  // });
}
