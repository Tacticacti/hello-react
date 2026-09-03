/**
 * 1 — DESTRUCTURING
 *
 * Why React cares: every component you write for the next four months starts
 * with a destructured parameter list.
 *
 *     function Card({ title, author = "Unknown" }) { ... }
 *
 * Run:  node Week_1/exercises/01-destructuring.js
 */

import { check, section, report } from "./runner.js";

const person = { firstName: "Ada", lastName: "Lovelace", id: 7 };

// ---------------------------------------------------------------------------
section("1.1  Destructure in the parameter list");
// Return "AL" for the person above.
// Rule: destructure in the PARAMETER LIST. No `p.firstName` in the body.

function initials({ firstName, lastName }) {
  return firstName[0] + lastName[0];
}

check("initials(person)", initials(person), "AL");

// ---------------------------------------------------------------------------
section("1.2  Default values");
// Return `${title} by ${author}`. If author is missing, use "Unknown".
// The default belongs in the destructuring, not in an if-statement.

function describe({ title, author = "Unknown" }) {
  return `${title} by ${author}`;
}

check(
  "describe with author",
  describe({ title: "Dune", author: "Herbert" }),
  "Dune by Herbert",
);
check(
  "describe without author",
  describe({ title: "Beowulf" }),
  "Beowulf by Unknown",
);

// ---------------------------------------------------------------------------
section("1.3  Renaming while destructuring");
// `id` is a terrible variable name in a big function. Pull it out AS `userId`.
// Return the string `user-7`.

function tag({ id: userId }) {
  return `user-${userId}`;
}

check("tag(person)", tag(person), "user-7");
check("tag({ id: 99 })", tag({ id: 99 }), "user-99");

// ---------------------------------------------------------------------------
section("1.4  Nested destructuring with a default");
// Reach two levels down and return the city. If there's no address at all,
// return "Unknown". Do it in one destructuring expression — no `if`, no `?.`
// (you'll meet `?.` in file 6; this is the destructuring way).

const withAddress = { name: "Ada", address: { city: "London", zip: "SW1" } };
const noAddress = { name: "Grace" };

function city({ address: { city: cityName = "Unknown" } = {} }) {
  return cityName;
}

check("city(withAddress)", city(withAddress), "London");
check("city(noAddress)", city(noAddress), "Unknown");
check(
  "address but no city",
  city({ name: "X", address: { zip: "123" } }),
  "Unknown",
);

// ---------------------------------------------------------------------------
section("1.5  Array destructuring");
// Return an array [second, first] — i.e. swap the first two elements
// and drop the rest. Use array destructuring, not indexing.

function swapFirstTwo([first, second]) {
  return [second, first];
}

check("swapFirstTwo", swapFirstTwo(["a", "b", "c"]), ["b", "a"]);

// ---------------------------------------------------------------------------
section("1.6  Rest in destructuring");
// Return { head, tail } where head is the first element and tail is an array
// of everything else.

function headAndTail([first, ...rest]) {
  return { head: first, tail: rest };
}

check("headAndTail", headAndTail([1, 2, 3, 4]), { head: 1, tail: [2, 3, 4] });
check("headAndTail single", headAndTail([1]), { head: 1, tail: [] });

// ---------------------------------------------------------------------------
section("1.7  The real thing");
// This is a React component in everything but name. Destructure the props
// object in the parameter list, with `tags` defaulting to an empty array,
// and return a summary string.
//
// Expected shape: "Dune — Herbert [sci-fi, classic]"
// With no tags:   "Dune — Herbert []"

function bookLine({ title, author, tags = [] }) {
  return `${title} — ${author} [${tags.join(", ")}]`;
}

check(
  "bookLine with tags",
  bookLine({ title: "Dune", author: "Herbert", tags: ["sci-fi", "classic"] }),
  "Dune — Herbert [sci-fi, classic]",
);
check(
  "bookLine without tags",
  bookLine({ title: "Dune", author: "Herbert" }),
  "Dune — Herbert []",
);

report();
