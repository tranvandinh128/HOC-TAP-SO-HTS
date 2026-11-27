
const encoder = new TextEncoder();
const passwordIterations = 310_000;
const sessionCookieName = "hts_session";

export const authCookieName = sessionCookieName;

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return new Uint8Array(bytes).buffer as ArrayBuffer;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return null;
  }

  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(
      base64.padEnd(Math.ceil(base64.length / 4) * 4, "="),
    );

    return Uint8Array.from(
      binary,
      (character) => character.charCodeAt(0),
    );
  } catch {
    return null;
  }
}

export function createOpaqueToken(byteLength = 32): string {
  if (!Number.isInteger(byteLength) || byteLength < 16 || byteLength > 128) {
    throw new RangeError("Token byte length must be between 16 and 128.");
  }

  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return bytesToBase64Url(bytes);
}

export async function digestToken(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(value),
  );

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function readSessionCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const [name, ...valueParts] = part.trim().split("=");

    if (name === sessionCookieName) {
      const token = valueParts.join("=");

      return /^[A-Za-z0-9_-]{40,64}$/.test(token) ? token : null;
    }
  }

  return null;
}

export function isValidPassword(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length >= 12 &&
    value.length <= 128 &&
    !/[\u0000-\u001f\u007f]/.test(value)
  );
}

export async function hashPassword(password: string): Promise<string> {
  if (!isValidPassword(password)) {
    throw new TypeError("Password does not meet the security requirements.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: toArrayBuffer(salt),
      iterations: passwordIterations,
    },
    key,
    256,
  );

  return `pbkdf2_sha256$${passwordIterations}$${bytesToBase64Url(salt)}$${bytesToBase64Url(new Uint8Array(bits))}`;
}

export async function verifyPassword(
  password: string,
  encoded: string,
): Promise<boolean> {
  const [algorithm, iterationsText, saltText, expectedText, ...extra] =
    encoded.split("$");

  const iterations = Number(iterationsText);
  const salt = saltText ? base64UrlToBytes(saltText) : null;
  const expected = expectedText ? base64UrlToBytes(expectedText) : null;

  if (
    extra.length > 0 ||
    algorithm !== "pbkdf2_sha256" ||
    !Number.isInteger(iterations) ||
    iterations < 100_000 ||
    iterations > 1_000_000 ||
    !salt ||
    salt.length < 16 ||
    !expected ||
    expected.length !== 32
  ) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const actual = new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: toArrayBuffer(salt),
        iterations,
      },
      key,
      256,
    ),
  );

  let difference = 0;

  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected[index] ^ actual[index];
  }

  return difference === 0;
}

export function constantTimeStringEqual(
  first: string,
  second: string,
): boolean {
  const left = encoder.encode(first);
  const right = encoder.encode(second);

  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }

  return difference === 0;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}
