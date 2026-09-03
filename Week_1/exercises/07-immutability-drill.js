/**
 * 7 — THE IMMUTABILITY DRILL
 *
 * This is the Week 1 "Done when" from your study plan. Four functions over an
 * array of { id, text, done } objects. Every one returns a NEW array. The
 * original is never touched.
 *
 * Banned outright: push, pop, shift, unshift, splice, sort, reverse, and any
 * assignment like items[0].done = true.
 *
 * There is no solutions file for this one, on purpose. This is the exercise
 * your plan says predicts whether Week 7 goes well.
 *
 * The input below is deep-frozen, so mutating it throws a TypeError rather
 * than quietly passing. If you see "Cannot assign to read only property",
 * that's the drill catching you — not a bug in the setup.
 *
 * Run:  node Week_1/exercises/07-immutability-drill.js
 */

import { check, section, report } from "./runner.js";

const ITEMS = Object.freeze([
  Object.freeze({ id: "a", text: "Buy milk", done: false }),
  Object.freeze({ id: "b", text: "Write tests", done: true }),
  Object.freeze({ id: "c", text: "Read docs", done: false }),
]);

// ===========================================================================
// Write your four functions here.
// ===========================================================================

// Returns a NEW array with one more item at the END.
// The new item: { id: <something unique>, text, done: false }
function addItem(items, text) {
  return [...items, { id: crypto.randomUUID(), text, done: false }];
}

// Returns a NEW array with the matching item's `done` flipped.
// Every other item is left exactly as it was.
function toggleItem(items, id) {
  return items.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item,
  );
}

// Returns a NEW array with the matching item gone.
function removeItem(items, id) {
  return items.filter((item) => item.id !== id);
}

// Returns a NEW array with the matching item's `text` replaced.
// Its id and done must survive.
function updateItem(items, id, text) {
  return items.map((item) => (item.id === id ? { ...item, text: text } : item));
}

// ===========================================================================
// Checks. Don't edit below this line.
// ===========================================================================

section("addItem");

const added = addItem(ITEMS, "Ship it");
const newItem = added?.[3];

check("returns 4 items", added?.length, 4);
check("appended at the end", newItem?.text, "Ship it");
check("new item starts not done", newItem?.done, false);
check("new item has an id", typeof newItem?.id !== "undefined", true);
check(
  "id is unique",
  ["a", "b", "c"].includes(newItem?.id) === false && newItem !== undefined,
  true,
);
check("existing items carried over", added?.[0]?.text, "Buy milk");
check("original still has 3", ITEMS.length, 3);
check("returned a different array", Boolean(added) && added !== ITEMS, true);

section("toggleItem");

const toggled = toggleItem(ITEMS, "b");

check("flipped true -> false", toggled?.[1]?.done, false);
check("text survived", toggled?.[1]?.text, "Write tests");
check("id survived", toggled?.[1]?.id, "b");
check("siblings untouched", toggled?.[0]?.done, false);
check("length unchanged", toggled?.length, 3);
check("original still true", ITEMS[1].done, true);
check(
  "the changed item is a NEW object",
  Boolean(toggled?.[1]) && toggled[1] !== ITEMS[1],
  true,
);
check(
  "unchanged items may be reused (this is fine either way)",
  toggled?.[0]?.text,
  "Buy milk",
);
check("flips false -> true too", toggleItem(ITEMS, "a")?.[0]?.done, true);
check("unknown id changes nothing", toggleItem(ITEMS, "zzz")?.length, 3);

section("removeItem");

const removed = removeItem(ITEMS, "b");

check("one fewer", removed?.length, 2);
check(
  "kept the right ones",
  removed?.map((item) => item.id),
  ["a", "c"],
);
check("original still has 3", ITEMS.length, 3);
check("unknown id removes nothing", removeItem(ITEMS, "zzz")?.length, 3);
check("removing the last one works", removeItem(ITEMS, "c")?.length, 2);

section("updateItem");

const updated = updateItem(ITEMS, "a", "Buy oat milk");

check("text replaced", updated?.[0]?.text, "Buy oat milk");
check("done survived", updated?.[0]?.done, false);
check("id survived", updated?.[0]?.id, "a");
check("siblings untouched", updated?.[1]?.text, "Write tests");
check("length unchanged", updated?.length, 3);
check("original text unchanged", ITEMS[0].text, "Buy milk");
check(
  "the changed item is a NEW object",
  Boolean(updated?.[0]) && updated[0] !== ITEMS[0],
  true,
);

section("all four together");
// The real test: chain them and confirm the source survived untouched.
// This is exactly what your Week 7 reducer will do, one action at a time.

let list = ITEMS;
list = addItem(list, "Deploy") ?? list;
list = toggleItem(list, "a") ?? list;
list = updateItem(list, "c", "Read the docs properly") ?? list;
list = removeItem(list, "b") ?? list;

check("ended with 3 items", list?.length, 3);
check(
  "ids in order",
  list?.map((item) => item.id),
  ["a", "c", list?.[2]?.id],
);
check("toggle survived the chain", list?.[0]?.done, true);
check("update survived the chain", list?.[1]?.text, "Read the docs properly");
check("ITEMS never changed", ITEMS, [
  { id: "a", text: "Buy milk", done: false },
  { id: "b", text: "Write tests", done: true },
  { id: "c", text: "Read docs", done: false },
]);

report();
