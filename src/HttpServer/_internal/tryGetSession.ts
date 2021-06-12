/**
 * @author Jason Anderson
 * @copyright 2016-2020 Jason Anderson
 * @license See vendor/wireframe/LICENSE file
 */

import * as http from "http";
import { Session } from "../../Session";
import { getCookies } from "./getCookies";

export function tryGetSession(
  req: http.IncomingMessage
): Promise<Session | undefined> {
  const cookies = getCookies(req.headers["cookie"]);
  const sessionKey = cookies.session;   // TODO configurable cookie name

  if (sessionKey == null) {
    return Promise.resolve(undefined);
  }

  // TODO get session
  // return Sessions.toOptionalFirstRow({
  //   columns: {
  //     sessionKey
  //   }
  // });
}
