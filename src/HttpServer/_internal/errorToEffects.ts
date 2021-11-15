import { EndpointEffect } from "../../Endpoint";

export function errorToEffects(err: Error): EndpointEffect[] {
  console.error(err);

  return [
    {
      type: "setStatusCode",
      code: 500
    },
    {
      type: "sendJson",
      content: {
        errorDescription: err.message
      }
    }
  ];
}
