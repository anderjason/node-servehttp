import * as http from "http";
import * as url from "url";
import { Endpoint, EndpointHandler } from "../../Endpoint";
import { HttpMethod } from "..";
import { handleNotFound } from "./handleNotFound";
import { handleStatic } from "./handleStatic";

function optionalEndpointHavingRelativePath(
  relativePath: string,
  endpoints: Endpoint[]
): Endpoint | undefined {
  return endpoints.find(e => {
    const endpointRelativePath = e.relativePath;

    if (endpointRelativePath === relativePath) {
      return true;
    }

    if (endpointRelativePath instanceof RegExp) {
      return endpointRelativePath.test(relativePath);
    }

    return false;
  });
}

export function getHandler(
  request: http.IncomingMessage,
  endpoints: Endpoint[],
  method: HttpMethod,
  urlParts: url.Url
): EndpointHandler {
  if (urlParts.pathname == null) {
    return handleNotFound;
  }

  let requestRelativePath = urlParts.pathname;
  if (requestRelativePath.startsWith("/")) {
    requestRelativePath = requestRelativePath.substr(1);
  }

  let endpoint = optionalEndpointHavingRelativePath(requestRelativePath, endpoints);

  if (endpoint == null) {
    if (endpoint == null) {
      return handleNotFound;
    }
  }

  let handler: EndpointHandler | undefined = undefined;
  switch (method) {
    case "GET":
      handler = endpoint.handleGet;
      break;
    case "DELETE":
      handler = endpoint.handleDelete;
      break;
    case "PUT":
      handler = endpoint.handlePut;
      break;
    case "POST":
      handler = endpoint.handlePost;
      break;
    default:
      break;
  }

  if (handler == null) {
    handler = handleNotFound;
  }

  return handler;
}
