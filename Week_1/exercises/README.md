# Week 1 — the six JavaScript things

Self-checking exercises for the six features your study plan says React actually
depends on. Every file runs with plain `node` and tells you pass or fail.

**This is not a JavaScript course.** It's a check on the six specific things, and
it should take one to two sessions. If a whole file is easy, you already know that
one — move on.

## Running them

From the `Week_1` folder:

```
node exercises/01-destructuring.js
node exercises/02-spread-rest.js
node exercises/03-array-methods.js
node exercises/04-arrow-functions.js
node exercises/05-modules/run.js
node exercises/06-async.js
```

Everything fails on a fresh checkout. That's the starting position — you're
turning `FAIL` into `PASS` one function at a time.

## Order

Do them 1 → 6. Two dependencies worth knowing about:

- **02 (spread/rest) is the load-bearing one.** Your plan calls it "the big one"
  and it's right — it's how you update state without mutating it, and mutating
  state is the single most common React beginner bug. Don't move on while it's
  shaky.
- **03 (array methods) uses the exact data shape from Project 1 "Stack."** The
  grouping and summary functions in 3.5 and 3.6 are the same logic you'll write
  in JSX in Week 3.

## How to actually get value out of these

**Type them. Don't paste.** Your plan says this and it's the main thing. The
muscle memory for destructured parameter lists and arrow syntax is real, and
copy-paste doesn't build it.

**Attempt before reading.** If you don't know how to do one, try it wrong first.
Fifteen minutes of floundering then reading the answer beats reading the answer
cold — you'll be reading with a question in hand.

**Three exercises are traps, and they're the point:**

| Where | What it catches |
|---|---|
| 4.3 | `n => { value: n }` returns `undefined`, not an object. Write it the broken way once and watch it. |
| 6.5 | `\|\|` falls back on `""` and `0`. `??` doesn't. This one silently corrupts real apps. |
| 2.6 | Spread is shallow. `{ ...state }` leaves nested objects shared. |

**The "original untouched" checks matter most.** Several exercises verify that
your function didn't mutate its input. A function can return the right answer
and still be wrong. Those checks are the whole reason file 02 exists.

## About the lint errors

Open the folder in VS Code on a fresh start and you'll see about 31 red
`no-unused-vars` errors. Nothing is broken — they're all "you declared a
parameter and never used it," which is true, because the function bodies are
empty. Each one disappears when you implement that function.

Treat the error count as a progress bar. Zero errors and all `PASS` means done.

## Solutions

In `solutions/`. Same filenames, working implementations, with comments on the
parts that aren't obvious.

Use them when you're genuinely stuck, not when you're uncomfortable — those feel
identical in the moment and they aren't. A reasonable rule: fifteen minutes of
real attempts on one exercise, then look.

## File 07 — the immutability drill

`07-immutability-drill.js` is your plan's Week 1 "Done when": `addItem`,
`toggleItem`, `removeItem`, `updateItem` over an array of `{ id, text, done }`.

Two differences from the others:

- **No solutions file.** On purpose. Your plan treats this as the exercise that
  predicts whether Week 7 goes well, and it's worth having one thing you finish
  from a blank page.
- **The input is deep-frozen**, so mutating it throws rather than quietly
  passing. `Cannot assign to read only property` means the drill caught you.

Do files 01–06 first. If 02 and 03 went smoothly this should take twenty minutes.
