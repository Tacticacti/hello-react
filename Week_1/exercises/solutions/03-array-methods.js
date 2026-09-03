import { check, section, report } from "../runner.js";

const books = [
  { id: 1, title: "Dune", pages: 412, status: "finished" },
  { id: 2, title: "Neuromancer", pages: 271, status: "reading" },
  { id: 3, title: "Snow Crash", pages: 440, status: "finished" },
  { id: 4, title: "Piranesi", pages: 245, status: "want-to-read" },
  { id: 5, title: "Solaris", pages: 204, status: "finished" },
];

section("3.1  map — transform every item");

const titles = (list) => list.map((book) => book.title);

check("titles", titles(books), [
  "Dune",
  "Neuromancer",
  "Snow Crash",
  "Piranesi",
  "Solaris",
]);

section("3.2  filter — keep some items");

const byStatus = (list, status) => list.filter((book) => book.status === status);

check("finished books", titles(byStatus(books, "finished")), [
  "Dune",
  "Snow Crash",
  "Solaris",
]);
check("no matches gives empty array", byStatus(books, "abandoned"), []);

section("3.3  find — get one item or undefined");

const findById = (list, id) => list.find((book) => book.id === id);

check("finds it", findById(books, 3).title, "Snow Crash");
check("missing id gives undefined", findById(books, 999), undefined);

section("3.4  reduce — collapse to a single value");

// The `0` at the end is the initial value. Without it, reduce on an empty
// array throws instead of returning 0.
const totalPages = (list) => list.reduce((total, book) => total + book.pages, 0);

check("totalPages", totalPages(books), 1572);
check("empty list gives 0", totalPages([]), 0);

section("3.5  reduce into an object — grouping");

function groupTitlesByStatus(list) {
  return list.reduce(
    (groups, book) => ({
      ...groups,
      [book.status]: [...(groups[book.status] ?? []), book.title],
    }),
    {},
  );
}

check("grouped", groupTitlesByStatus(books), {
  finished: ["Dune", "Snow Crash", "Solaris"],
  reading: ["Neuromancer"],
  "want-to-read": ["Piranesi"],
});

section("3.6  The Week 3 summary line");

function summary(list) {
  const done = list.filter((book) => book.status === "finished").length;
  return `${done} of ${list.length} done`;
}

check("summary", summary(books), "3 of 5 done");
check(
  "still right with a sixth book",
  summary([...books, { id: 6, title: "Roadside Picnic", pages: 145, status: "finished" }]),
  "4 of 6 done",
);

section("3.7  Chaining");

// The [...list] copy is the important bit — .sort() mutates in place, so
// sorting `list` directly would reorder the caller's array.
const longestFinished = (list) =>
  [...list]
    .filter((book) => book.status === "finished")
    .sort((a, b) => b.pages - a.pages)
    .map((book) => book.title)
    .join(", ");

check("longestFinished", longestFinished(books), "Snow Crash, Dune, Solaris");
check("original order untouched", books[0].title, "Dune");
check("original length untouched", books.length, 5);

report();
