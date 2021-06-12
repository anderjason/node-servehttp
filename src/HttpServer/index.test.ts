import { LocalDirectory } from "@anderjason/node-filesystem";
import { Test } from "@anderjason/tests";
import { PromiseUtil } from "@anderjason/util";
import { HttpServer } from ".";
import { Endpoint, EndpointEffect, EndpointRequest } from "../Endpoint";

Test.define("HttpServer can serve GET at http://localhost:8000/test", async () => {
  const server = new HttpServer({
    port: 8000,
    cacheDirectory: undefined,
    endpoints: [
      new Endpoint({
        relativePath: "test",
        handleGet: async (req: EndpointRequest): Promise<EndpointEffect[]> => {
          return [
            {
              type: "sendJson",
              content: {
                message: "hello"
              }
            }
          ]
        }
      })
    ]
  });
  server.activate();

  await PromiseUtil.asyncDelayOfForever();
})