// Neon Breakout entry — make.fun program/v1 (Node 22, standard library only).
//
// The entry itself is the X post: this program's only job is to hand the
// house the post's address. It reads POST.json from the repository root and
// copies it, byte for byte, into the output directory, where the gate reads
// it and then overwrites /output/post.counts.json with its own reading of
// the post's views and interactions. Nothing this program writes is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// It prints nothing on success and exits non-zero when POST.json is missing
// or does not name an X post, so a bad placeholder fails loudly instead of
// silently entering a post that can never be read.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const POST_FILE = "POST.json";
const MAX_POST_BYTES = 16384;

// An X post address, as X shows it: x.com or twitter.com, an optional
// www./mobile. subdomain, then /<handle>/status/<digits> or /i/web/status/<digits>.
const POST_URL = /^https?:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/(?:i\/web\/status\/\d+|[^/]+\/status\/\d+)\/?([?#].*)?$/;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function readPost(botDir: string): string {
  const source = join(botDir, POST_FILE);
  let size: number;
  try {
    size = statSync(source).size;
  } catch {
    fail(`${POST_FILE} not found in ${botDir} — write the post's address into it first.`);
  }
  if (size > MAX_POST_BYTES) {
    fail(`${POST_FILE} is ${size} bytes, over the ${MAX_POST_BYTES}-byte limit.`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(source, "utf8"));
  } catch (error) {
    fail(`${POST_FILE} is not valid JSON: ${(error as Error).message}`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail(`${POST_FILE} must be a JSON object like {"url": "https://x.com/<handle>/status/<id>"}.`);
  }
  const rawUrl = (parsed as Record<string, unknown>).url;
  if (typeof rawUrl !== "string") {
    fail(`${POST_FILE} does not name an X post — expected {"url": "https://x.com/<handle>/status/<id>"}, got ${JSON.stringify(rawUrl)}.`);
  }
  const url = rawUrl.trim();
  if (url.includes("<handle>") || url.includes("<id>")) {
    fail(`${POST_FILE} still holds the starter placeholder — replace it with the real post address first.`);
  }
  if (!POST_URL.test(url)) {
    fail(`${POST_FILE} does not name an X post — expected {"url": "https://x.com/<handle>/status/<id>"}, got ${JSON.stringify(url)}.`);
  }
  return url;
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const url = readPost(botDir);
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, POST_FILE);
  try {
    copyFileSync(join(botDir, POST_FILE), target);
  } catch (error) {
    fail(`could not copy ${POST_FILE} to ${target}: ${(error as Error).message}`);
  }
  // The copy is byte-for-byte, so re-reading the target must give the same url.
  if (readPost(outputDir) !== url) {
    fail(`${POST_FILE} changed while copying — refusing to hand in a different post.`);
  }
}

main();
