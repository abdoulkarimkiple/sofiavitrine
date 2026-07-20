import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

const iterations = 120000;
const keyLength = 64;
const digest = "sha512";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString("hex");

  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationsValue, salt, hash] = storedHash.split("$");

  if (algorithm !== "pbkdf2" || !iterationsValue || !salt || !hash) {
    return false;
  }

  const derivedHash = pbkdf2Sync(password, salt, Number(iterationsValue), keyLength, digest);
  const storedBuffer = Buffer.from(hash, "hex");

  return storedBuffer.length === derivedHash.length && timingSafeEqual(storedBuffer, derivedHash);
}
