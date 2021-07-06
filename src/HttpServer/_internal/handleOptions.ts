import { EndpointEffect } from "../../Endpoint";

export async function handleOptions(): Promise<EndpointEffect[]> {
  return [
    {
      type: "mergeHeaders",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true"
      }
    }
  ];
}
