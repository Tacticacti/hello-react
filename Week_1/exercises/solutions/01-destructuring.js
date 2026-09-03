import { check, section, report } from "../runner.js";

const person = { firstName: "Ada", lastName: "Lovelace", id: 7 };

section("1.1  Destructure in the parameter list");

function initials({ firstName, lastName }) {
  return firstName[0] + lastName[0];
}

check("initials(person)", initials(person), "AL");

section("1.2  Default values");

function describe({ title, author = "Unknown" }) {
  return `${title} by ${author}`;
}

check(
  "describe with author",
  describe({ title: "Dune", author: "Herbert" }),
  "Dune by Herbert",
);
check("describe without author", describe({ title: "Beowulf" }), "Beowulf by Unknown");

section("1.3  Renaming while destructuring");

function tag({ id: userId }) {
  return `user-${userId}`;
}

check("tag(person)", tag(person), "user-7");

section("1.4  Nested destructuring with a default");

const withAddress = { name: "Ada", address: { city: "London", zip: "SW1" } };
const noAddress = { name: "Grace" };

// The `= {}` on `address` is what stops this throwing when address is absent:
// you can't destructure `city` out of undefined.
function city({ address: { city: cityName = "Unknown" } = {} }) {
  return cityName;
}

check("city(withAddress)", city(withAddress), "London");
check("city(noAddress)", city(noAddress), "Unknown");

section("1.5  Array destructuring");

function swapFirstTwo([first, second]) {
  return [second, first];
}

check("swapFirstTwo", swapFirstTwo(["a", "b", "c"]), ["b", "a"]);

section("1.6  Rest in destructuring");

function headAndTail([head, ...tail]) {
  return { head, tail };
}

check("headAndTail", headAndTail([1, 2, 3, 4]), { head: 1, tail: [2, 3, 4] });
check("headAndTail single", headAndTail([1]), { head: 1, tail: [] });

section("1.7  The real thing");

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
