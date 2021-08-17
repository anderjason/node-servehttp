/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */

import * as WebSocket from "ws";
import * as http from "http";
import { getCookies } from "./getCookies";

// const envelopeAgents = new Set<EnvelopeAgent>();

export function handleWebSocket(
  ws: WebSocket,
  req: http.IncomingMessage
): void {
  // const cookies = getCookies(req.headers["cookie"]);

  // const sessionKey = cookies.wireframeSession;
  // if (sessionKey == null) {
  //   ws.close(4000, "Unauthorized (missing session cookie)");
  //   return;
  // }

  // const envelopeAgent = new EnvelopeAgent(json => ws.send(json));
  // envelopeAgent.sessionKey = sessionKey;
  // envelopeAgents.add(envelopeAgent);

  // envelopeAgent.sendEnvelope<any>({
  //   envelopeKey: "hello",
  //   envelopeBody: {
  //     from: "server"
  //   }
  // });

  console.log("connected");

  ws.on("message", messageData => {
    console.log("message");
    // try {
    //   envelopeAgent.handleIncomingJson(messageData.toString());
    // } catch (err) {
    //   RunContext.instance.error(err);
    // }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    // envelopeAgents.delete(envelopeAgent);
  });

  ws.on("error", err => {
    // RunContext.instance.error(err);
  });
}

// export function sendEnvelopeToAll<T>(envelope: Envelope<T>) {
//   envelopeAgents.forEach(agent => {
//     agent.sendEnvelope(envelope);
//   });
// }

// export function sendEnvelopeToSession<T>(
//   envelope: Envelope<T>,
//   sessionKey: string
// ) {
//   const matches = Array.from(envelopeAgents).filter(
//     a => a.sessionKey === sessionKey
//   );

//   matches.forEach(match => {
//     match.sendEnvelope(envelope);
//   });
// }

// export function sendEnvelopeToUser<T>(envelope: Envelope<T>, userId: string) {
//   Sessions.toRowsHavingConditions({
//     columns: {
//       userId
//     }
//   }).then(sessions => {
//     const sessionKeys = sessions.map(s => s.sessionKey!);

//     sessionKeys.forEach(sessionKey => {
//       sendEnvelopeToSession(envelope, sessionKey);
//     });
//   });
// }
