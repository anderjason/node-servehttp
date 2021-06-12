import { EndpointEffect, SetStatusCodeEffect } from "../../Endpoint";

export function handleNotFound(): Promise<EndpointEffect[]> {
  return Promise.resolve([
    {
      type: "setStatusCode",
      code: 404
    } as SetStatusCodeEffect
  ]);
}
