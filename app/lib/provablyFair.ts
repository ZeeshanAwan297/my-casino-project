import crypto from "crypto";

export function generateSeeds() {
  const serverSeed = crypto.randomBytes(32).toString("hex");
  const clientSeed = crypto.randomBytes(16).toString("hex");

  const nonce = Date.now();

  return { serverSeed, clientSeed, nonce };
}

export function generateCrashPoint(serverSeed: string, clientSeed: string, nonce: number) {
  const hash = crypto
    .createHash("sha256")
    .update(`${serverSeed}:${clientSeed}:${nonce}`)
    .digest("hex");

  const num = parseInt(hash.substring(0, 13), 16);

  const crash = Math.max(1, (num % 10000) / 100);

  return parseFloat(crash.toFixed(2));
}