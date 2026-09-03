/**
 * 3 — ARRAY METHODS
 *
 * .map() renders every list you will ever build. .filter() builds the groups
 * in your Week 3 dashboard. .reduce() computes the "8 of 12 done" summary line.
 *
 * These exercises use the exact data shape from Project 1 ("Stack") on purpose.
 * Everything you write here you will write again in three weeks, in JSX.
 *
 * Run:  node Week_1/exercises/03-array-methods.js
 */

import { check, section, report } from "./runner.js";

const books = [
  { id: 1, title: "Dune", pages: 412, status: "finished" },
  { id: 2, title: "Neuromancer", pages: 271, status: "reading" },
  { id: 3, title: "Snow Crash", pages: 440, status: "finished" },
  { id: 4, title: "Piranesi", pages: 245, status: "want-to-read" },
  { id: 5, title: "Solaris", pages: 204, status: "finished" },
];

// ---------------------------------------------------------------------------
section("3.1  map — transform every item");

function titles(list) {
  // TODO: return an array of just the titles
  return list.map((book) => book.title);
}

check("titles", titles(books), [
  "Dune",
  "Neuromancer",
  "Snow Crash",
  "Piranesi",
  "Solaris",
]);

// ---------------------------------------------------------------------------
section("3.2  filter — keep some items");

function byStatus(list, status) {
  // TODO: return only the books with that status
  return list.filter((book) => book.status === status);
}

check(
  "finished books",
  byStatus(books, "finished")?.map((book) => book.title),
  ["Dune", "Snow Crash", "Solaris"],
);
check("no matches gives empty array", byStatus(books, "abandoned"), []);

// ---------------------------------------------------------------------------
section("3.3  find — get one item or undefined");
// Note what happens when nothing matches. find returns undefined, not null,
// and NOT an empty array. Getting this wrong is a very common source of
// "Cannot read properties of undefined".

function findById(list, id) {
  // TODO
  return list.find((book) => book.id === id);
}

check("finds it", findById(books, 3)?.title, "Snow Crash");
check("missing id gives undefined", findById(books, 999), undefined);

// ---------------------------------------------------------------------------
section("3.4  reduce — collapse to a single value");

function totalPages(list) {
  // TODO: sum the pages. Remember the initial value.
  return list.reduce((sum, current) => sum + current.pages, 0);
}

check("totalPages", totalPages(books), 1572);
check("empty list gives 0", totalPages([]), 0);

// ---------------------------------------------------------------------------
section("3.5  reduce into an object — grouping");
// This is the one worth struggling with. Group the books by status into:
//   { finished: [...], reading: [...], "want-to-read": [...] }
// Values are arrays of TITLES, not whole book objects.
//
// Your accumulator starts as {} and you build it up. Do not mutate the
// accumulator with push — return a new object each pass.

function groupTitlesByStatus(list) {
  // TODO
  return list.reduce(
    (acc, book) => ({
      ...acc,
      [book.status]: [...(acc[book.status] ?? []), book.title],
    }),
    {},
  );
}

check("grouped", groupTitlesByStatus(books), {
  finished: ["Dune", "Snow Crash", "Solaris"],
  reading: ["Neuromancer"],
  "want-to-read": ["Piranesi"],
});

// ---------------------------------------------------------------------------
section("3.6  The Week 3 summary line");
// Return exactly "3 of 5 done". Compute both numbers from the array —
// nothing hardcoded, and it must still be right if you add a sixth book.

function summary(list) {
  let booksDone = list.filter((books) => books.status === "finished").length;
  let totalBooks = list.length;
  return `${booksDone} of ${totalBooks} done`;
}

check("summary", summary(books), "3 of 5 done");
check(
  "still right with a sixth book",
  summary([
    ...books,
    { id: 6, title: "Roadside Picnic", pages: 145, status: "finished" },
  ]),
  "4 of 6 done",
);

// ---------------------------------------------------------------------------
section("3.7  Chaining");
// Titles of finished books, longest first, joined with ", ".
// One expression, method chain, no intermediate variables.
//
// Trap: .sort() mutates the array it's called on. The last check catches it.

function longestFinished(list) {
  return list
    .filter((books) => books.status === "finished")
    .sort((book1, book2) => book2.pages - book1.pages)
    .map((books) => books.title)
    .join(", ");
}

check("longestFinished", longestFinished(books), "Snow Crash, Dune, Solaris");
check("original order untouched", books[0].title, "Dune");
check("original length untouched", books.length, 5);

report();
