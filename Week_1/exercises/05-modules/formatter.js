/**
 * DEFAULT EXPORT.
 *
 * A module can have at most ONE default export. The importer can call it
 * whatever it likes — the name is not checked:
 *
 *     import formatName from "./formatter.js";
 *     import literallyAnything from "./formatter.js";   // same thing
 *
 * This is why `import React from "react"` works without braces, and why in
 * React projects each component file default-exports its component.
 *
 * A file can have a default export AND named exports at the same time.
 */

// TODO: replace null with a function that takes (first, last) and returns
// them joined by SEPARATOR — e.g. formatName("Ada", "Lovelace") -> "Ada Lovelace"
export default function joinName(first, last) {
  return [first, last].join(SEPARATOR);
}

// TODO: export a named constant SEPARATOR equal to a single space " "
export const SEPARATOR = " ";
