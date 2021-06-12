/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */

import { LocalFile } from "@anderjason/node-filesystem";
import {
  EndpointRequest,
  EndpointEffect,
  SendFileEffect,
} from "../../Endpoint";
import { HttpSharedFile } from "../../HttpSharedFile";
import { LocalDirectory } from "@anderjason/node-filesystem";

export async function handleStatic(
  req: EndpointRequest
): Promise<EndpointEffect[]> {
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
