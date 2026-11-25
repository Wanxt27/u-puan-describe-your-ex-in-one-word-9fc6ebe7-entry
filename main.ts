// Describe Your Ex in One Word — make.fun entry.
// Writes a single-word verdict on an ex to /output/entry.txt.
// Node 24, stdlib only.
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

const word = "unsubscribed";

// The verdict: a subscription you cancel, not a person you mourn.
// It reads instantly as an ex, lands as a joke, and needs no caption.

// Gate: the entry must be exactly one word, 1-111 UTF-8 characters,
// not only whitespace, with nothing else attached — no internal
// whitespace at all, so the file holds a single token.
const words = word.trim().split(/\s+/).filter(Boolean);
const bytes = Buffer.byteLength(word, "utf8");
if (
  words.length !== 1 ||
  /\s/.test(word) ||
  word.length < 1 ||
  word.length > 111 ||
  bytes > 111 ||
  word.includes("\n") ||
  word.trim().length === 0
) {
  throw new Error(`word fails the gate (${words.length} words, ${word.length} chars, ${bytes} bytes)`);
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the word, and a smaller text
// wins the tie-break, so nothing extra is written.
writeFileSync("/output/entry.txt", word, "utf8");

// Read back what was written: the file the judge sees must be the word,
// byte for byte, with nothing extra — same byte length, same content.
if (readFileSync("/output/entry.txt", "utf8") !== word) {
  throw new Error("entry.txt does not match the word");
}
if (statSync("/output/entry.txt").size !== bytes) {
  throw new Error("entry.txt byte size does not match the word");
}

console.log(`wrote ${word.length} characters (${bytes} bytes) to /output/entry.txt`);
