export function cookieHeader(key: string, value: string): string {
  const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  if (!fieldContentRegExp.test(key)) {
    throw new TypeError("Invalid cookie key");
  }

  const encodedValue = encodeURIComponent(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("Invalid cookie value");
  }

  return `${key}=${value}; path=/; HttpOnly`;
}
