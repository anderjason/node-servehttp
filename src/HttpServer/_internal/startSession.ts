import { Session } from "../../Session";

export async function startSession() {
  return new Session();
}