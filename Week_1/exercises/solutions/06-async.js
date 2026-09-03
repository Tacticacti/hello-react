import { check, section, report } from "../runner.js";

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

section("6.1  Make a promise");

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

check("delay resolves", await delay(10, "done"), "done");

section("6.2  await it");

async function getName(id) {
  const user = await fakeFetchUser(id);
  return user.name;
}

check("getName(1)", await getName(1), "Ada");

section("6.3  try/catch around a rejection");

async function getNameSafe(id) {
  try {
    const user = await fakeFetchUser(id);
    return user.name;
  } catch {
    return "unknown";
  }
}

check("existing user", await getNameSafe(1), "Ada");
check("missing user", await getNameSafe(99), "unknown");

section("6.4  Optional chaining ?.");

// Two `?.` because either link in the chain can be missing.
const cityOf = (user) => user?.address?.city;

check("has address", cityOf(DB[1]), "London");
check("address is null", cityOf(DB[2]), undefined);
check("no user at all", cityOf(undefined), undefined);

section("6.5  ?? vs || — read this one carefully");

// With `||` this returns "Anonymous" for user 3, because "" is falsy.
// `??` only falls back on null/undefined, so the empty string survives.
const displayName = (user) => user.name ?? "Anonymous";

check("normal name", displayName(DB[1]), "Ada");
check("empty string is preserved", displayName(DB[3]), "");
check("missing name falls back", displayName({ id: 4 }), "Anonymous");

const pageCount = (book) => book.pages ?? "unknown";

check("zero is preserved", pageCount({ pages: 0 }), 0);
check("missing falls back", pageCount({}), "unknown");

section("6.6  Sequential vs parallel");

// The sequential version:
//   const names = [];
//   for (const id of ids) names.push(await getName(id));
//   return names;
// ...takes 60ms because each await blocks the next request from starting.
//
// Promise.all starts all three immediately and waits for the slowest.
async function getNames(ids) {
  return Promise.all(ids.map((id) => getName(id)));
}

const started = Date.now();
const names = await getNames([1, 2, 3]);
const elapsed = Date.now() - started;

check("returns all three names", names, ["Ada", "Grace", ""]);
check(`ran in parallel (took ${elapsed}ms, needs to be under 45)`, elapsed < 45, true);

section("6.7  The four states");

async function load(id) {
  try {
    const data = await fakeFetchUser(id);
    return { status: "success", data };
  } catch (error) {
    return { status: "error", error: error.message };
  }
}

check("success", await load(1), { status: "success", data: DB[1] });
check("error", await load(99), { status: "error", error: "No user 99" });

report();
