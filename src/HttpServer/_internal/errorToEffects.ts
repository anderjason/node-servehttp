import { EndpointEffect } from "../../Endpoint";

export function errorToEffects(err: Error): EndpointEffect[] {
  console.error(err);

  return [
    {
      type: "sendJson",
      content: {
        errorDescription: err.message
      }
    }
  ];
}
