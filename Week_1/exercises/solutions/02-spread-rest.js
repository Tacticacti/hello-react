import { check, section, report } from "../runner.js";

section("2.1  Copy an object with one field changed");

function withStatus(book, status) {
  return { ...book, status };
}

const dune = { id: 1, title: "Dune", status: "reading" };
check("returns updated copy", withStatus(dune, "finished"), {
  id: 1,
  title: "Dune",
  status: "finished",
});
check("original untouched", dune, { id: 1, title: "Dune", status: "reading" });
check("is a different object", withStatus(dune, "finished") !== dune, true);

section("2.2  Merge, with the right precedence");

function mergeSettings(defaults, overrides) {
  return { ...defaults, ...overrides };
}

check(
  "overrides win",
  mergeSettings({ theme: "light", size: 12 }, { theme: "dark" }),
  { theme: "dark", size: 12 },
);

section("2.3  Insert into an array without splice");

function insertAt(arr, index, item) {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
}

const letters = ["a", "b", "d"];
check("inserts in the middle", insertAt(letters, 2, "c"), ["a", "b", "c", "d"]);
check("inserts at the start", insertAt(letters, 0, "z"), ["z", "a", "b", "d"]);
check("original untouched", letters, ["a", "b", "d"]);

section("2.4  Rest parameters");

function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

check("sum(1, 2, 3)", sum(1, 2, 3), 6);
check("sum()", sum(), 0);

section("2.5  Rest in destructuring — removing a key");

function omit(obj, key) {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _removed, ...rest } = obj;
  return rest;
}

const user = { id: 1, name: "Ada", password: "hunter2" };
check("removes the key", omit(user, "password"), { id: 1, name: "Ada" });
check("original untouched", user, { id: 1, name: "Ada", password: "hunter2" });

section("2.6  Nested update — the one that catches people");

// One spread per level you're changing. `{ ...state, display: { ... } }` —
// the outer spread alone would leave `display` pointing at the same object.
function setTheme(state, theme) {
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

check("theme updated", next.display.theme, "dark");
check("sibling field kept", next.display.fontSize, 14);
check("original untouched", state.display.theme, "light");
check("nested object was copied, not shared", next.display !== state.display, true);

report();
