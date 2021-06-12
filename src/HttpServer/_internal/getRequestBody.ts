import * as http from "http";
import { objectGivenQueryString } from "./objectGivenQueryString";

export function getRequestBodyString(
  req: http.IncomingMessage
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    let body: string = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

export function getRequestBody(
  req: http.IncomingMessage
): Promise<any | undefined> {
  return getRequestBodyString(req).then((body) => {
    if (body == null) {
      return undefined;
    }

    // everything up to an optional semicolon
    const requestContentType = (req.headers["content-type"] || "").replace(
      /^(.*?);.*/,
      "$1"
    );

    switch (requestContentType) {
      case "application/json":
        return JSON.parse(body);
      case "application/x-www-form-urlencoded":
        return objectGivenQueryString(body);
      default:
        return body;
    }
  });
}
