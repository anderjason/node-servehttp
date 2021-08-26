import { LocalFile } from "@anderjason/node-filesystem";
import {
  EndpointEffect,
  EndpointRequest, SendFileEffect
} from "../../Endpoint";
import { HttpSharedFile } from "../../HttpSharedFile";
import { handleNotFound } from "./handleNotFound";

export function handleStatic(
  sharedFiles?: HttpSharedFile[],
  fallbackFile?: LocalFile
) {
  if (sharedFiles == null) {
    return handleNotFound;
  }

  return async (req: EndpointRequest): Promise<EndpointEffect[]> => {
    const relativeUrl = req.relativePath.replace(/^\/?(.*)/, "$1");

    let serverAbsoluteFile: LocalFile;

    const publicFile = sharedFiles.find(
      (sf) => sf.toRelativeUrl() == relativeUrl
    );

    if (publicFile != null) {
      serverAbsoluteFile = publicFile.toLocalFile();
    } else {
      if (fallbackFile == null) {
        return handleNotFound();
      }

      serverAbsoluteFile = fallbackFile;
    }

    return [
      {
        type: "sendFile",
        file: serverAbsoluteFile,
      } as SendFileEffect,
    ];
  };
}
