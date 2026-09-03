export const add = (a, b) => a + b;

export const multiply = (a, b) => a * b;

export const TAU = 6.28;

function half(n) {
  return n / 2;
}

// Export list with a rename. `half` stays the local name; the outside world
// only ever sees `halve`.
export { half as halve };
