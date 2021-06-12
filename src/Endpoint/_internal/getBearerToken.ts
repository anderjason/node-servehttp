import { IncomingHttpHeaders } from "http2";

export function getBearerToken(
  headers: IncomingHttpHeaders
): string | undefined {
  if (headers == null || headers.authorization == null) {
    return undefined;
  }

  const authorization = headers.authorization!;
  if (authorization.indexOf("Bearer") === -1) {
    return undefined;
  }

  return authorization.replace("Bearer ", "");
}
