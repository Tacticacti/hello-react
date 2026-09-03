/**
 * 6 — PROMISES, ASYNC/AWAIT, TRY/CATCH, ?. AND ??
 *
 * Everything here comes back in Week 8-9 when you build the Pokedex.
 * 6.6 in particular is the shape of every data-fetching component you'll write.
 *
 * Run:  node Week_1/exercises/06-async.js
 */

import { check, section, report } from "./runner.js";

// ---------------------------------------------------------------------------
// A fake API. Pretend this is the network. Don't edit it.
const DB = {
  1: { id: 1, name: "Ada", address: { city: "London" } },
  2: { id: 2, name: "Grace", address: null },
  3: { id: 3, name: "", nickname: "Kat" },
};

function fakeFetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (DB[id]) resolve(DB[id]);
      else reject(new Error(`No user ${id}`));
    }, 20);
  });
}

// ---------------------------------------------------------------------------
section("6.1  Make a promise");
// Return a promise that resolves to `value` after `ms` milliseconds.

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

check("delay resolves", await delay(10, "done"), "done");

// ---------------------------------------------------------------------------
section("6.2  await it");
// Return just the user's name. Must be an async function.

async function getName(id) {
  // TODO
  const user = await fakeFetchUser(id);
  return user.name;
}

check("getName(1)", await getName(1), "Ada");

// ---------------------------------------------------------------------------
section("6.3  try/catch around a rejection");
// Return the name, or the string "unknown" if the fetch rejects.
// Do NOT let the rejection escape.

async function getNameSafe(id) {
  // TODO
  try {
    const user = await fakeFetchUser(id);
    return user.name;
  } catch {
    return `unknown`;
  }
}

check("existing user", await getNameSafe(1), "Ada");
check("missing user", await getNameSafe(99), "unknown");

// ---------------------------------------------------------------------------
section("6.4  Optional chaining ?.");
// Return the city, or undefined if there's no address.
// One expression, no if-statement, no try/catch.
//
// Note user 2 has `address: null` — that's the case that crashes naive code.

function cityOf(user) {
  // TODO
  return user?.address?.city;
}

check("has address", cityOf(DB[1]), "London");
check("address is null", cityOf(DB[2]), undefined);
check("no user at all", cityOf(undefined), undefined);

// ---------------------------------------------------------------------------
section("6.5  ?? vs || — read this one carefully");
// Return the name to display: the user's `name`, or "Anonymous" if the name
// is missing.
//
// User 3 has name: "" — an empty string. It IS present, just empty.
//
// Write it with || first and run the file. Then write it with ?? and run
// again. The difference between the two lines is the whole lesson:
//   ||  falls back on any FALSY value  ("" , 0, false, null, undefined)
//   ??  falls back only on null and undefined
//
// Here we want the empty string preserved.

function displayName(user) {
  // TODO: use ??
  return user.name ?? "Anonymous";
}

check("normal name", displayName(DB[1]), "Ada");
check("empty string is preserved", displayName(DB[3]), "");
check("missing name falls back", displayName({ id: 4 }), "Anonymous");

// A second case where the distinction bites: 0 is a real page count.
function pageCount(book) {
  return book.pages ?? "unknown";
}

check("zero is preserved", pageCount({ pages: 0 }), 0);
check("missing falls back", pageCount({}), "unknown");

// ---------------------------------------------------------------------------
section("6.6  Sequential vs parallel");
// Fetch users 1, 2 and 3 and return their names as an array.
//
// First write it with a for-loop and await inside. It works, and it takes
// three times as long as it needs to, because each request waits for the
// previous one.
//
// Then rewrite it with Promise.all. Same result, one third the time.
// The check below measures elapsed time and will fail the slow version.

async function getNames(ids) {
  // TODO
  // const names = [];
  // for (let id of ids) {
  //   let currUser = await fakeFetchUser(id);
  //   names.push(currUser.name);
  // }
  // return names;
  let promises = ids.map((id) => fakeFetchUser(id));

  return (await Promise.all(promises)).map((obj) => obj.name);
}

const started = Date.now();
const names = await getNames([1, 2, 3]);
const elapsed = Date.now() - started;

check("returns all three names", names, ["Ada", "Grace", ""]);
check(
  `ran in parallel (took ${elapsed}ms, needs to be under 45)`,
  elapsed < 45,
  true,
);

// ---------------------------------------------------------------------------
section("6.7  The four states");
// This is the shape your plan asks for in Week 6 and every fetch after it.
// Return one of: "loading" is handled by the caller, so you return
//   { status: "success", data }   on success
//   { status: "error", error }    on failure, where error is the message string
//
// Modelling it as one object with a status field — rather than three separate
// booleans — is the single most useful state-shape habit in React.

async function load(id) {
  try {
    const user = await fakeFetchUser(id);
    return { status: "success", data: user };
  } catch (error) {
    return { status: "error", error: error.message };
  }
}

check("success", await load(1), { status: "success", data: DB[1] });
check("error", await load(99), { status: "error", error: "No user 99" });

report();
