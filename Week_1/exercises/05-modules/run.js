/**
 * 5 — IMPORT / EXPORT
 *
 * Edit math.js and formatter.js. Don't edit this file — read it, though.
 * Every import style you'll use in React is demonstrated in the lines below.
 *
 * Run:  node Week_1/exercises/05-modules/run.js
 */

import { check, section, report } from "../runner.js";

// Named imports. The braces are not an object — it's import syntax.
// These names must match the exports exactly, or Node refuses to even
// start the file.
import { add, multiply, TAU } from "./math.js";

// Namespace import: everything the module exports, as one object.
// Used here so a missing `halve` shows up as a normal failure instead of
// crashing the whole run.
import * as math from "./math.js";

// Default import + a named import from the same module.
// `formatName` is a name WE chose. The module didn't specify it.
import formatName, { SEPARATOR } from "./formatter.js";

// ---------------------------------------------------------------------------
section("5.1  Named exports");

check("add(2, 3)", add?.(2, 3), 5);
check("multiply(4, 5)", multiply?.(4, 5), 20);
check("TAU", TAU, 6.28);

// ---------------------------------------------------------------------------
section("5.2  Renamed export (export { half as halve })");

check("math.halve(10)", math.halve?.(10), 5);
check("the original name is NOT exported", math.half, undefined);

// ---------------------------------------------------------------------------
section("5.3  Default export");

check("formatName", formatName?.("Ada", "Lovelace"), "Ada Lovelace");
check("SEPARATOR", SEPARATOR, " ");

// ---------------------------------------------------------------------------
section("5.4  The default import name is arbitrary");
// Proving the point: same module, different local name, same function.

const { default: whateverIWant } = await import("./formatter.js");
check(
  "renamed default still works",
  whateverIWant?.("Grace", "Hopper"),
  "Grace Hopper",
);

// ---------------------------------------------------------------------------
section("5.5  Check your understanding");
// No code for this one. Answer out loud before moving on:
//
//   a) Why does `import React from "react"` have no braces, but
//      `import { useState } from "react"` does?
//   b) You rename a default-exported component from Card to BookCard.
//      Which files break — the one exporting it, or the ones importing it?
//   c) Same question for a named export.
//
// If (b) and (c) have different answers, you've understood the difference.

report();
