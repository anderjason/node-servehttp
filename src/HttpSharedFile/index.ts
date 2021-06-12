import { LocalFile } from "@anderjason/node-filesystem";
 
 export class HttpSharedFile {
   static givenLocalFile(
     localFile: LocalFile,
     ...relativeUrlParts: string[]
   ): HttpSharedFile {
     return new HttpSharedFile(localFile, relativeUrlParts);
   }
 
   private _relativeUrlParts: string[];
   private _localFile: LocalFile;
 
   private constructor(localFile: LocalFile, relativeUrlParts: string[]) {
     this._relativeUrlParts = relativeUrlParts;
     this._localFile = localFile;
   }
 
   toLocalFile(): LocalFile {
     return this._localFile;
   }
 
   toRelativeUrlParts(): string[] {
     return this._relativeUrlParts;
   }
 
   toRelativeUrl(): string {
     return this._relativeUrlParts.join("/");
   }
 }
 