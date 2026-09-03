/**
 * NAMED EXPORTS.
 *
 * A module can have as many named exports as it likes. The importer must ask
 * for them by their exact name:  import { add } from "./math.js"
 *
 * This is why you write `import { useState } from "react"` — useState is one
 * of many named exports React provides.
 *
 * Each stub below is already exported so `run.js` can load this file.
 * Your job is to make them actually work.
 */

// TODO: make this add two numbers
export const add = (x, y) => x + y;

// TODO: make this multiply two numbers
export const multiply = (x, y) => x * y;

// TODO: export a constant TAU equal to 6.28
export const TAU = 6.28;

// ---------------------------------------------------------------------------
// TODO: below, write a function called `half` and export it using the
// "export list" syntax at the bottom of the file, renaming it to `halve`
// on the way out:
//
//     function half(n) { ... }
//     export { half as halve };
//
// Two ways to spell the same idea. You'll see both in real codebases.

function half(n) {
  return n / 2;
}

export { half as halve };
