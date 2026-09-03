/**
 * Tiny test runner. You don't need to edit this file, but do read it once —
 * it's about 40 lines and it uses several of the six things you're learning.
 */

let passed = 0;
let failed = 0;

function fmt(value) {
  if (typeof value === "function") return "[function]";
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/** Deep equality without pulling in a library. */
function same(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => key in b && same(a[key], b[key]));
}

export function section(title) {
  console.log(`\n\x1b[1m${title}\x1b[0m`);
}

export function check(label, actual, expected) {
  if (same(actual, expected)) {
    passed += 1;
    console.log(`  \x1b[32mPASS\x1b[0m  ${label}`);
  } else {
    failed += 1;
    console.log(`  \x1b[31mFAIL\x1b[0m  ${label}`);
    console.log(`          expected: ${fmt(expected)}`);
    console.log(`          actual:   ${fmt(actual)}`);
  }
}

export function report() {
  console.log(
    `\n${passed} passed, ${failed} failed` +
      (failed === 0 ? "  \x1b[32mAll good.\x1b[0m" : ""),
  );
}
