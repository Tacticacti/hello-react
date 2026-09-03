/**
 * 4 — ARROW FUNCTIONS AND IMPLICIT RETURN
 *
 * Short file, one genuinely nasty trap in it (4.3).
 *
 * Run:  node Week_1/exercises/04-arrow-functions.js
 */

import { check, section, report } from "./runner.js";

// ---------------------------------------------------------------------------
section("4.1  Implicit return");
// Write `double` as an arrow function on ONE line with no braces and no
// `return` keyword.

const double = (x) => x * 2; // TODO

check("double(4)", double?.(4), 8);

// ---------------------------------------------------------------------------
section("4.2  Single parameter, multiple parameters");
// `greet` takes one arg. `add` takes two. Both arrows, both implicit return.

const greet = (x) => `Hello, ${x}`; // TODO: name => "Hello, Ada"  for greet("Ada")
const add = (x, y) => x + y; // TODO

check("greet", greet?.("Ada"), "Hello, Ada");
check("add", add?.(2, 3), 5);

// ---------------------------------------------------------------------------
section("4.3  Returning an object literal — THE TRAP");
// An arrow's braces mean "function body". So `n => { value: n }` does not
// return an object — it's a body containing a label. It returns undefined.
//
// Try writing it the broken way first and run the file. Watching it return
// undefined once is worth more than reading this comment.
//
// Then fix it by wrapping the object in parentheses.

const makePoint = (x, y) => ({ x, y });

check("makePoint", makePoint?.(1, 2), { x: 1, y: 2 });

// ---------------------------------------------------------------------------
section("4.4  The trap, in the place you'll actually hit it");
// Turn an array of names into an array of objects, using .map with an arrow
// that implicitly returns an object. This exact line appears in real React
// code constantly.

function toRecords(names) {
  // TODO: one line — names.map(...)
  return names.map((name) => ({ name, active: true }));
}

check("toRecords", toRecords(["Ada", "Grace"]), [
  { name: "Ada", active: true },
  { name: "Grace", active: true },
]);

// ---------------------------------------------------------------------------
section("4.5  When you need a block body");
// Two statements, so you need braces AND an explicit return.
// Return "ADA (3)" — uppercased name, then its length in parens.

const shout = (x) => {
  return `${x.toUpperCase()} (${x.length})`;
}; // TODO

check("shout", shout?.("Ada"), "ADA (3)");

// ---------------------------------------------------------------------------
section("4.6  Returning a function");
// `multiplier(3)` returns a function that multiplies its argument by 3.
// Write it as an arrow that returns an arrow.
//
// You'll meet this shape in event handlers: onClick={() => remove(id)}

const multiplier = (x) => (y) => x * y; // TODO

check("multiplier(3)(4)", multiplier?.(3)?.(4), 12);
check(
  "reusable",
  [1, 2, 3].map((n) => multiplier?.(10)?.(n)),
  [10, 20, 30],
);

report();
