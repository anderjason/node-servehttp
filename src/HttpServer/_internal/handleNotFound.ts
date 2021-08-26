import { EndpointEffect, SetStatusCodeEffect } from "../../Endpoint";

export function handleNotFound(): Promise<EndpointEffect[]> {
  return Promise.resolve([
    {
      type: "mergeHeaders",
      headers: {
        "X-Served-By": "node-servehttp"
      }
    },
    {
      type: "setStatusCode",
      code: 404
    } as SetStatusCodeEffect
  ]);
}
