/**
 * 2 — SPREAD AND REST
 *
 * Your plan calls this "the big one" and it's right. This is how you update
 * state without mutating it, and mutating state is THE React beginner bug.
 *
 * Several checks below verify that the ORIGINAL was left untouched. Those are
 * the ones that matter. A function can return the right answer and still be
 * wrong, if it got there by mutating its input.
 *
 * Run:  node Week_1/exercises/02-spread-rest.js
 */

import { check, section, report } from "./runner.js";

// ---------------------------------------------------------------------------
section("2.1  Copy an object with one field changed");

function withStatus(book, status) {
  // TODO: return a NEW object, same as `book` but with the given status
  return { ...book, status };
}

const dune = { id: 1, title: "Dune", status: "reading" };
check("returns updated copy", withStatus(dune, "finished"), {
  id: 1,
  title: "Dune",
  status: "finished",
});
check("original untouched", dune, { id: 1, title: "Dune", status: "reading" });
check(
  "is a different object",
  Boolean(withStatus(dune, "finished")) &&
    withStatus(dune, "finished") !== dune,
  true,
);

// ---------------------------------------------------------------------------
section("2.2  Merge, with the right precedence");
// Later values win. This is how default props work.

function mergeSettings(defaults, overrides) {
  // TODO
  return { ...defaults, ...overrides };
}

check(
  "overrides win",
  mergeSettings({ theme: "light", size: 12 }, { theme: "dark" }),
  { theme: "dark", size: 12 },
);

// ---------------------------------------------------------------------------
section("2.3  Insert into an array without splice");
// Return a NEW array with `item` inserted at `index`.
// Banned: splice, push, and any assignment to arr[i].

function insertAt(arr, index, item) {
  return [...arr.slice(0, index), item, ...arr.slice(index, arr.length)];
}

const letters = ["a", "b", "d"];
check("inserts in the middle", insertAt(letters, 2, "c"), ["a", "b", "c", "d"]);
check("inserts at the start", insertAt(letters, 0, "z"), ["z", "a", "b", "d"]);
check("original untouched", letters, ["a", "b", "d"]);

// ---------------------------------------------------------------------------
section("2.4  Rest parameters");
// Accept any number of arguments and return their sum. Zero args gives 0.

function sum(...args) {
  let sum = 0;

  for (let arg of args) {
    sum += arg;
  }

  return sum;
}

check("sum(1, 2, 3)", sum(1, 2, 3), 6);
check("sum()", sum(), 0);

// ---------------------------------------------------------------------------
section("2.5  Rest in destructuring — removing a key");
// Return a NEW object with `key` removed. Use destructuring with rest.
// Banned: the `delete` operator (it mutates).
//
// Hint: you can destructure with a computed key — { [key]: _removed, ...rest }

function omit(obj, key) {
  const { [key]: toRemove, ...rest } = obj;
  return rest;
}

const user = { id: 1, name: "Ada", password: "hunter2" };
check("removes the key", omit(user, "password"), { id: 1, name: "Ada" });
check("original untouched", user, { id: 1, name: "Ada", password: "hunter2" });

// ---------------------------------------------------------------------------
section("2.6  Nested update — the one that catches people");
// Spread is SHALLOW. `{ ...state }` copies the top level only; nested objects
// are still shared references.
//
// Update settings.display.theme without mutating anything at any level.

function setTheme(state, theme) {
  // const { display, ...restOfState } = state;
  // const { theme: toChange, ...restOfDisplay } = display;
  // return { ...restOfState, display: { theme, ...restOfDisplay } };
  return {
    ...state,
    display: { ...state.display, theme },
  };
}

const state = {
  user: "Ada",
  display: { theme: "light", fontSize: 14 },
};
const next = setTheme(state, "dark");

check("theme updated", next?.display?.theme, "dark");
check("sibling field kept", next?.display?.fontSize, 14);
check("original untouched", state.display.theme, "light");
check(
  "nested object was copied, not shared",
  Boolean(next?.display) && next.display !== state.display,
  true,
);

report();
