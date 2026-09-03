import { check, section, report } from "../../runner.js";
import { add, multiply, TAU } from "./math.js";
import * as math from "./math.js";
import formatName, { SEPARATOR } from "./formatter.js";

section("5.1  Named exports");

check("add(2, 3)", add?.(2, 3), 5);
check("multiply(4, 5)", multiply?.(4, 5), 20);
check("TAU", TAU, 6.28);

section("5.2  Renamed export (export { half as halve })");

check("math.halve(10)", math.halve?.(10), 5);
check("the original name is NOT exported", math.half, undefined);

section("5.3  Default export");

check("formatName", formatName?.("Ada", "Lovelace"), "Ada Lovelace");
check("SEPARATOR", SEPARATOR, " ");

section("5.4  The default import name is arbitrary");

const { default: whateverIWant } = await import("./formatter.js");
check("renamed default still works", whateverIWant?.("Grace", "Hopper"), "Grace Hopper");

section("5.5  Check your understanding");
// a) `React` is the module's DEFAULT export, so it needs no braces and you
//    could call it anything. `useState` is one of many NAMED exports, so the
//    braces pick it out by name and the name must match.
// b) Renaming a default export breaks nothing. Importers chose their own
//    local name and never referenced yours.
// c) Renaming a named export breaks every importer, because they ask for it
//    by exact name. That asymmetry is the whole practical difference.

report();
