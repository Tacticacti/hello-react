import { check, section, report } from "../runner.js";

section("4.1  Implicit return");

const double = (n) => n * 2;

check("double(4)", double(4), 8);

section("4.2  Single parameter, multiple parameters");

const greet = (name) => `Hello, ${name}`;
const add = (a, b) => a + b;

check("greet", greet("Ada"), "Hello, Ada");
check("add", add(2, 3), 5);

section("4.3  Returning an object literal — THE TRAP");

// Without the parens, `{ x, y }` is read as a function BODY, not an object.
// The body contains two label statements and returns undefined.
const makePoint = (x, y) => ({ x, y });

check("makePoint", makePoint(1, 2), { x: 1, y: 2 });

section("4.4  The trap, in the place you'll actually hit it");

const toRecords = (names) => names.map((name) => ({ name, active: true }));

check("toRecords", toRecords(["Ada", "Grace"]), [
  { name: "Ada", active: true },
  { name: "Grace", active: true },
]);

section("4.5  When you need a block body");

const shout = (name) => {
  const upper = name.toUpperCase();
  return `${upper} (${name.length})`;
};

check("shout", shout("Ada"), "ADA (3)");

section("4.6  Returning a function");

const multiplier = (factor) => (n) => n * factor;

check("multiplier(3)(4)", multiplier(3)(4), 12);
check("reusable", [1, 2, 3].map(multiplier(10)), [10, 20, 30]);

report();
