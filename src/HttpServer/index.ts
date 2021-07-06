import { Actor } from "skytree";
import * as http from "http";
import * as url from "url";
import { Dict, Observable, ReadOnlyObservable, Receipt } from "@anderjason/observable";
import { getRequestBody } from "./_internal/getRequestBody";
import { Endpoint, EndpointRequest } from "../Endpoint";
import { applyEndpointEffects } from "./_internal/applyEndpointEffects";
import { Session } from "../Session";
import { errorToEffects } from "./_internal/errorToEffects";
import { getHandler } from "./_internal/getHandler";
import { LocalDirectory } from "@anderjason/node-filesystem";

export type HttpMethod = "HEAD" | "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS";
const knownMethods: Set<HttpMethod> = new Set(["GET", "PUT", "POST", "DELETE", "OPTIONS"]);

export interface HttpServerProps {
  port: number;
  endpoints: Endpoint[];
  cacheDirectory: LocalDirectory;
}

export class HttpServer extends Actor<HttpServerProps> {
  private _isListening = Observable.givenValue(false, Observable.isStrictEqual);
  readonly isListening = ReadOnlyObservable.givenObservable(this._isListening);

  onActivate() {
    const httpServer = http.createServer(this.handleRequest);

    httpServer.listen(this.props.port, () => {
      this._isListening.setValue(true);
    });

    this.cancelOnDeactivate(
      new Receipt(() => {
        httpServer.close(() => {
          this._isListening.setValue(false);
        });
      })
    )
  }

  private handleRequest = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
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
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "*";
      headers["Access-Control-Allow-Credentials"] = "true";
      headers["Access-Control-Allow-Headers"] = req.headers["access-control-request-headers"];

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

      const handler = getHandler(req, this.props.endpoints, method, urlParts);

      let endpointEffects;
      try {
        endpointEffects = await handler(endpointRequest);
      } catch (err) {
        endpointEffects = errorToEffects(err);
      }

      await applyEndpointEffects(endpointEffects, req, res, this.props.cacheDirectory, session);
    } catch (err) {
      console.error(err);

      res.statusCode = 500;
      res.end();
    }
  }
}
