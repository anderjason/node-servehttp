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
  if (sharedFiles == null && fallbackFile == null) {
    return handleNotFound;
  }

  return async (req: EndpointRequest): Promise<EndpointEffect[]> => {
    const relativeUrl = req.relativePath.replace(/^\/?(.*)/, "$1");

    let serverAbsoluteFile: LocalFile;

    let publicFile: HttpSharedFile;
    if (sharedFiles != null) {
      publicFile = sharedFiles.find(
        (sf) => sf.toRelativeUrl() == relativeUrl
      );
    }

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
