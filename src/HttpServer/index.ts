import { Actor } from "skytree";
import * as http from "http";
import * as url from "url";
import {
  Dict,
  Observable,
  ReadOnlyObservable,
  Receipt,
} from "@anderjason/observable";
import { getRequestBody } from "./_internal/getRequestBody";
import { Endpoint, EndpointRequest } from "../Endpoint";
import { applyEndpointEffects } from "./_internal/applyEndpointEffects";
import { Session } from "../Session";
import { errorToEffects } from "./_internal/errorToEffects";
import { getHandler } from "./_internal/getHandler";
import { LocalDirectory, LocalFile } from "@anderjason/node-filesystem";
import { WebsocketServer } from "../WebsocketServer";
import { HttpSharedFile } from "../HttpSharedFile";

export type HttpMethod =
  | "HEAD"
  | "GET"
  | "PUT"
  | "POST"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";
const knownMethods: Set<HttpMethod> = new Set([
  "GET",
  "PUT",
  "POST",
  "PATCH",
  "DELETE",
  "OPTIONS",
]);

export interface HttpServerProps {
  port: number;
  endpoints: Endpoint[];
  cacheDirectory: LocalDirectory;

  staticDirectory?: LocalDirectory;
  sharedFiles?: HttpSharedFile[];
  fallbackFile?: LocalFile;
  host?: string;
}

export class HttpServer extends Actor<HttpServerProps> {
  private _isListening = Observable.givenValue(false, Observable.isStrictEqual);
  readonly isListening = ReadOnlyObservable.givenObservable(this._isListening);

  private _websocketServer: WebsocketServer;
  private _sharedFiles: HttpSharedFile[];

  get websocketServer(): WebsocketServer {
    return this._websocketServer;
  }

  onActivate() {
    const httpServer = http.createServer(this.handleRequest);

    this._websocketServer = this.addActor(
      new WebsocketServer({
        httpServer,
      })
    );

    httpServer.listen(this.props.port, this.props.host ?? "0.0.0.0", () => {
      this._isListening.setValue(true);
    });

    this.cancelOnDeactivate(
      new Receipt(() => {
        httpServer.close(() => {
          this._isListening.setValue(false);
        });
      })
    );
  }

  private async getSharedFiles(): Promise<HttpSharedFile[]> {
    const { staticDirectory } = this.props;

    if (this._sharedFiles == null) {
      this._sharedFiles = this.props.sharedFiles ?? [];

      if (staticDirectory != null) {
        const staticFiles = await staticDirectory.toDescendantFiles();

        for (const file of staticFiles) {
          const relativePath = staticDirectory.toRelativePathParts(file);
          if (relativePath.some((p) => p === ".DS_Store")) {
            continue;
          }

          this._sharedFiles.push(
            HttpSharedFile.givenLocalFile(file, ...relativePath)
          );
        }
      }
    }

    return this._sharedFiles;
  }

  private handleRequest = async (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> => {
    try {
      const urlParts = url.parse(req.url!, true);

      let params: any | undefined = undefined;

      const body = await getRequestBody(req);

      if (body != null && typeof body === "object") {
        params = {
          ...urlParts.query,
          ...body,
        };
      } else {
        params = urlParts.query;
      }

      // const session = await tryGetSession(req);
      const session = new Session();

      const headers: Dict<string> = {};

      Object.keys(req.headers).forEach((key) => {
        const val = req.headers[key];
        if (val != null) {
          headers[key] = String(val);
        }
      });

      let method = req.method as HttpMethod;
      if (req.method === "HEAD") {
        method = "GET";
      }

      if (!knownMethods.has(method)) {
        throw new Error(`Unsupported method '${method}'`);
      }

      const endpointRequest: EndpointRequest = {
        headers,
        method,
        relativePath: urlParts.pathname!,
        requestParams: params,
        body: body,
      };

      const sharedFiles = await this.getSharedFiles();

      const handler = getHandler(
        req,
        this.props.endpoints,
        sharedFiles,
        this.props.fallbackFile,
        method,
        urlParts
      );

      let endpointEffects;
      try {
        endpointEffects = await handler(endpointRequest);
      } catch (err) {
        endpointEffects = errorToEffects(err);
      }

      await applyEndpointEffects(
        endpointEffects,
        req,
        res,
        this.props.cacheDirectory,
        session
      );
    } catch (err) {
      console.error(err);

      res.statusCode = 500;
      res.end();
    }
  };
}
