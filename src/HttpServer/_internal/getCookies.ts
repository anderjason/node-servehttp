import { Dict } from "@anderjason/observable";

export function getCookies(
  cookieHeader: string | string[] | undefined
): Dict<string> {
  if (cookieHeader == null) {
    return {};
  }

  if (typeof cookieHeader !== "string") {
    throw new Error("Cookie header must be a string");
  }

  const result: Dict<string> = {};
  const pairs = cookieHeader.split(/; */);

  pairs.forEach((pair) => {
    const equalIndex = pair.indexOf("=");

    if (equalIndex !== -1) {
      const key = pair.substr(0, equalIndex).trim();
      let val = pair.substr(equalIndex + 1, pair.length).trim();

      // quoted values
      if ('"' == val[0]) {
        val = val.slice(1, -1);
      }

      if (result[key] == null) {
        try {
          result[key] = decodeURIComponent(val);
        } catch (e) {
          result[key] = val;
        }
      }
    }
  });

  return result;
}
