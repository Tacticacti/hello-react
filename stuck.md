# stuck.md

My React debugging journal. Started: `2026-Aug-06`

---

## How to use this

**Three rules, because a journal with ten rules dies in week two.**

1. **Log it while you're still annoyed.** Not at the end of the session. Ninety seconds, right after it resolves, while you can still remember what you wrongly believed.
2. **Most entries are one line.** Use the Quick log. Only promote something to a Deep entry if it changed how you think, not just what you typed.
3. **The fix is the least interesting part.** What matters is what you _expected_ to happen. That gap is the actual bug — the code was just a symptom.

**Review ritual:** skim the Quick log at the start of each new project (5 min). At each project boundary, do a consolidation pass — move anything you've now hit twice into **Patterns**. That's where the real value shows up: by Week 12 you'll be answering your own Week 6 questions from this file.

**Tags** — keep these consistent so `grep`/Ctrl-F works later:

`#state` `#effects` `#props` `#async` `#types` `#routing` `#forms` `#tests` `#tooling` `#css` `#deploy` `#git` `#destructuring`

---

## Quick log

One line each. Format: `date · #tag · symptom → cause`

```
2026-__-__ · #tag · what looked wrong → what was actually wrong
```

<!-- newest at the top -->

### Week 2

### Week 1

- `2026-Aug-09` · `#destructuring` · For exercise 1.7, I thought destructuring the tags doesn't need join as the return value is really similar → Turns out I have to put .join(", ") after tags as if I don't call it, it calls Array.prototype.toString() by default and when working with react later, this could not put any separator at all.
- `2026-Aug-08` · `#destructuring` · For exercise 1.4, I thought when setting default values for nested destructuring, I set the default value as an entire object which only checked for one path (function city({ address: { city } = { city: "Unknown" } })) → Turns out I can actually separaate the defaults into 2 possibilities so that both address and city are guarded as well (function city({ address: { city: cityName = "Unknown" } = {} })). Also, it's better to rename city to cityName as city is the name of the function!
- `2026-Aug-08` · `#destructuring` · For exercise 1.3, I thought when destructuring an object with a custom name in my function parameter had the same syntax as assigning a default value (function tag({ userId = person.id })) → Turns out it was a completely different syntax and it looks similar to assigning values to a dictionary (function tag({ id: userId }))
- `2026-Aug-06` · `#tooling` ·I thought my prettier formatting was not working → Turns out I had installed the wrong prettier extension from vs code. I installed the correct one and it works now.
- `2026-Aug-06` · `#tooling` ·Looked as if my eslint extension in vs code was conflicting with the one I am am manually installing → Turns out i had to initialise an empty npm package, then use eslint 9 instead of 10 as there is no support for eslint 10 with react right now.

---

## Deep entries

Copy this block. Only for the ones that taught you something.

```markdown
### YYYY-MM-DD · Week \_ · #tag

**Trying to:**

**Expected / actually got:**

**How I found it:**

**Fix:**

**What I now understand that I didn't:**

**Cost:** \_\_ min · Would I catch it faster next time? Y / N
```

---

<!-- ============ EXAMPLES — delete these two once you've written your own ============ -->

### 2026-**-** · Week 5 · #state

**Trying to:** Make a "+3" button on the Score Keeper.

**Expected / actually got:** Expected three `setScore(score + 1)` calls to add 3. It added 1.

**How I found it:** Logged `score` inside the handler — it was the same value all three times, not incrementing between calls.

**Fix:** `setScore(s => s + 1)` — the updater form, which receives the pending value rather than the one captured at render.

**What I now understand that I didn't:** I thought `score` was a live variable I was reading and writing. It isn't. It's a _value frozen into this particular render_ — every render gets its own `score` and its own copy of the handler. Setting state doesn't change the current one, it schedules the next render. "State is a snapshot" isn't a metaphor, it's literally how it works.

**Cost:** 25 min · Would I catch it faster next time? **Y** — the tell is "my handler reads stale state."

---

### 2026-**-** · Week 9 · #async #effects

**Trying to:** Search the Pokédex without stale results appearing.

**Expected / actually got:** Typed "pika" quickly. Results briefly showed the right list, then flipped back to results for "pik". Only reproducible on a throttled connection.

**How I found it:** Network tab — two requests in flight, and the _earlier_ one resolved last. Nothing wrong with either response.

**Fix:** `AbortController` in the effect, aborted in the cleanup function, so a superseded request can't write to state.

**What I now understand that I didn't:** Two things. (1) `await` guarantees ordering _within_ one function, not _between_ two calls of it — I'd been assuming requests come back in the order I sent them. (2) The effect cleanup isn't only for unsubscribing from things; it's the hook for "this run of the effect is no longer the current one." That reframing makes cleanup obvious instead of ceremonial.

**Cost:** 70 min · Would I catch it faster next time? **Y** — any time results "flicker back," suspect ordering, not rendering.

<!-- ============ END EXAMPLES ============ -->

---

## Patterns

Things I've now hit **more than once**. Promote from the Quick log during consolidation passes. This section is the one that saves you time later.

| Pattern | Tell | What it usually is |
| ------- | ---- | ------------------ |
|         |      |                    |

_Seed rows to fill in as you meet them:_

- **Nothing re-renders after I update state** → almost always mutation. Did I `push`/`splice`/`sort` or assign to a property?
- **Effect runs forever** → `setState` inside an effect with a missing or unstable dependency.
- **Handler sees old values** → snapshot semantics; reach for the updater form.
- **Works locally, breaks deployed** → environment variables, base paths, or CORS. In that order.

---

## Answered my own question

When you look something up here and it solves your current problem, log it. This is the file paying you back, and the tally is a better progress signal than any checklist.

- `____-__-__` — Week ** — reread the entry from Week ** about `____`, fixed it in \_\_ min.

---

## Diagnosed without Google ⭐

**Week 14 milestone.** A bug you couldn't search verbatim, worked out from your own reasoning plus DevTools. Write these up properly — they're the strongest interview material you'll produce in the whole plan, because they demonstrate diagnostic process rather than recall.

### \_**\_-**-\_\_ · The bug

**Why it wasn't googleable:**

**How I reasoned toward it:**

**What the process taught me about how I debug:**

---

## Open questions

Things still unresolved. Revisit at each project boundary — a surprising number answer themselves once you've learned more.

- [ ] …
- [ ] …
