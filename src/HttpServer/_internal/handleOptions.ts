import { EndpointEffect } from "../../Endpoint";

export async function handleOptions(): Promise<EndpointEffect[]> {
  return [
    {
      type: "mergeHeaders",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ];
}
