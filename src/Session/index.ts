import { UniqueId } from "@anderjason/node-crypto";

export class Session {
  readonly sessionKey: string;
  // TODO

  constructor(sessionKey?: string) {
    this.sessionKey = sessionKey || UniqueId.ofRandom().toUUIDString();
  }
}