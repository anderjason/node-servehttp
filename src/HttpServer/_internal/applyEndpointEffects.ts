import * as http from "http";
import { PromiseUtil } from "@anderjason/util";
import { EndpointEffect } from "../../Endpoint";
import { applyMergeHeadersEffect } from "./applyMergeHeadersEffect";
import { applyMergeSessionPropertiesEffect } from "./applyMergeSessionPropertiesEffect";
import { applySendCustomBodyEffect } from "./applySendCustomBodyEffect";
import { applySendFileEffect } from "./applySendFileEffect";
import { applySendJsonEffect } from "./applySendJsonEffect";
import { applySetStatusCodeEffect } from "./applySetStatusCodeEffect";
import { cookieHeader } from "./cookieHeader";
import { Session } from "../../Session";
import { LocalDirectory } from "@anderjason/node-filesystem";
import { startSession } from "./startSession";

export interface EffectContext {
  session: Session;
  req: http.IncomingMessage;
  res: http.ServerResponse;
}

async function ensureSession(
  currentSession: Session | undefined,
  res: http.ServerResponse
): Promise<Session> {
  if (currentSession != null) {
    return currentSession;
  }

  const session = await startSession();

  res.setHeader(
    "Set-Cookie",
    cookieHeader("session", session.sessionKey!) // TODO configure cookie name
  );

  return session;
}

export async function applyEndpointEffects(
  endpointEffects: EndpointEffect[],
  req: http.IncomingMessage,
  res: http.ServerResponse,
  cacheDirectory: LocalDirectory,
  currentSession?: Session
): Promise<void> {
  const session = await ensureSession(currentSession, res);

  const context: EffectContext = {
    session,
    req,
    res,
  };

  const needsDefaultStatusCode = !endpointEffects.some(
    (e) =>
      e.type === "setStatusCode" ||
      e.type === "sendJson" ||
      e.type === "sendCustomBody" ||
      e.type === "sendFile"
  );

  if (needsDefaultStatusCode) {
    res.statusCode = 204;
  } else {
    res.statusCode = 200;
  }

  endpointEffects.unshift({
    type: "mergeHeaders",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": req.headers["access-control-request-headers"] || "Content-Type",
    },
  });

  try {
    await PromiseUtil.asyncSequenceGivenArrayAndCallback(
      endpointEffects,
      async (effect) => {
        switch (effect.type) {
          case "mergeHeaders":
            await applyMergeHeadersEffect(effect, context);
            break;
          case "mergeSessionProperties":
            await applyMergeSessionPropertiesEffect(effect, context);
            break;
          case "setStatusCode":
            await applySetStatusCodeEffect(effect, context);
            break;
          case "sendJson":
            if (req.method !== "HEAD") {
              await applySendJsonEffect(effect, context);
            }
            break;
          case "sendCustomBody":
            if (req.method !== "HEAD") {
              await applySendCustomBodyEffect(effect, context);
            }
            break;
          case "sendFile":
            if (req.method !== "HEAD") {
              await applySendFileEffect(effect, context, cacheDirectory);
            }
            break;
          default:
            throw new Error("Unsupported effect type");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
  }

  res.end();
}
