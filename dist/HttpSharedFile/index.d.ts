import { LocalFile } from "@anderjason/node-filesystem";
export declare class HttpSharedFile {
    static givenLocalFile(localFile: LocalFile, ...relativeUrlParts: string[]): HttpSharedFile;
    private _relativeUrlParts;
    private _localFile;
    private constructor();
    toLocalFile(): LocalFile;
    toRelativeUrlParts(): string[];
    toRelativeUrl(): string;
}
