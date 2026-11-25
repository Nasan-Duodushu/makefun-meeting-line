// The Meeting That Should Have Been One Line — entry program.
// Writes the one sentence that replaces the meeting (1-200 chars) to /output/entry.txt.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "This meeting could have been an email. This email could have been a shrug.";

function validateMeetingLine(line: string): number {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`meeting line is ${chars} chars, outside the 1-200 gate`);
  }
  const trimmed = line.trim();
  if (trimmed.length === 0 || line.includes("\n")) {
    throw new Error("meeting line must be a single non-empty line");
  }
  if (line !== trimmed) {
    throw new Error("meeting line must not start or end with whitespace");
  }
  if (!/[.!?]$/.test(trimmed)) {
    throw new Error("meeting line must end with terminal punctuation");
  }
  return chars;
}

function main(): void {
  const chars = validateMeetingLine(SENTENCE);
  const encoded = new TextEncoder().encode(SENTENCE);
  if (!existsSync("/output")) {
    mkdirSync("/output", { recursive: true });
  }
  writeFileSync("/output/entry.txt", encoded);
  console.log(`wrote ${chars} chars to /output/entry.txt`);
}

main();
