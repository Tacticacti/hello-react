# React Study Plan — Edward

**18 weeks · 5 escalating projects · 5–8 hrs/week · ~115 total hours**
Built for: rusty-but-real JavaScript, casual pace, ending in a full-stack CRUD app and a deployed personal site.
Verified against React 19.2 / React Router 8.3 docs, August 2026.

---

## What I changed from the plan you brought me, and why

**The timeline was wrong for your pace.** The 10-week version assumes ~15 hrs/week — about 150 hours. At 5–8 hrs/week you'd need ~23 weeks to cover it as written. Rather than stretch it and let it rot, I cut scope: dropped the ASCII converter (it teaches nothing the Score Keeper doesn't), folded the "Typed Component Library" into the CRUD project instead of making it standalone, and merged the routing and Context weeks. Result: 18 weeks with real slack in it.

**TypeScript moved from Week 8 to Week 11.** The original plan has you write everything in JavaScript, then convert it all at the end. That's a rewrite, not a lesson, and it's the single most common way these plans stall out. Better: learn React in plain JS for 10 weeks, then start TypeScript *right before* the CRUD milestone so you build the big project typed from scratch. You convert one small old project as practice, not five.

**Your tooling knowledge will be a version behind.** React Router shipped v8 in June 2026 and it deleted the `react-router-dom` package. Every tutorial, Stack Overflow answer and blog post written before mid-2026 — which is nearly all of them — tells you to `npm install react-router-dom`. That will now install an abandoned package. There's a "2026 traps" section at the bottom; read it before Week 10, not after you've lost an evening.

**Personal site is the capstone, as you asked** — but a plain client-side React SPA is a bad personal site. It renders blank until JavaScript loads, which hurts search engines and link previews. Week 17 uses React Router's framework mode with pre-rendering so your site ships as real HTML. Same React you already know, one config setting different.

**Added a JS warm-up week.** "Decent but rusty" is exactly the profile that gets ambushed in Week 7 by immutable array updates. Week 1 fixes the six JS things React actually depends on. It is not a JavaScript course.

---

## Ground rules

These matter more than the curriculum.

**Split your week into 3 sessions, not 1.** Two short sessions (~1.5 hrs) for reading docs and doing the exercises, one longer session (~3 hrs) for building. Spaced repetition beats one Saturday marathon, and the long session is where things actually click.

**Never read more than 45 minutes without writing code.** React docs are seductive — they're well-written and you'll feel productive reading them. You aren't. If you've been reading for 45 minutes, stop and go type something, even badly.

**Type the code, don't paste it.** Especially in Weeks 2–7. The muscle memory for JSX syntax and hook call shapes is a real thing and copy-paste doesn't build it.

**Every project gets its own git repo, pushed to GitHub.** Not because you need version control for a to-do list, but because in Week 18 you'll want 8 repos to point at, and retroactively creating them is miserable.

**Respect the "Done when" line.** Each project below has one. When you hit it, commit, push, and move on — even if the CSS is ugly. Polishing Week 5's Score Keeper for three weeks is the other common way this plan dies.

**Keep a `stuck.md` file.** One line per thing that confused you and how it resolved. By Week 12 you'll be answering your own Week 6 questions from it.

---

# The five-project spine

Everything below this section is scaffolding. **These five projects are the actual plan.** The weekly breakdowns tell you what to read and in what order; these tell you what you're building and how you'll know it worked.

| # | Project | Weeks | Role |
|---|---|---|---|
| 1 | **Stack** — static dashboard | 2–4 | Foundation: think in components |
| 2 | **Tally** — task manager | 5–7 | New concepts: state and interactivity |
| 3 | **Pokédex** — API client | 8–10 | Real-world: async data, routing, real bugs |
| 4 | **Shelf** — client-side CRUD | 11–14 | Challenge: you design it, nobody hands it to you |
| 5 | **Shelf, full-stack** | 15–16 | Portfolio: deployed, tested, defensible |

## How to run a project so it's experiential and not tutorial-following

This matters more than which projects you pick. The difference between four months of real learning and four months of typing along is almost entirely in this loop.

**1. Build blind first.** Attempt the feature *before* reading the doc page about it. You will do it wrong. That is the entire point — you now have a specific question, and reading with a question in hand is worth about ten times reading to acquire. Fifteen minutes of productive floundering beats an hour of comprehension.

**2. Break it on purpose.** Every project below has scripted failures — specific things I want you to make go wrong. Don't skip them because the app already works. They're the highest-value fifteen minutes of each project, because a concept you've watched fail is a concept you own, and a concept you've only read about is a concept you'll re-read in three weeks.

**3. Then read the docs.** Now the page answers something you actually wanted to know, and it takes half as long.

**4. Rebuild the core from an empty file.** Each project has a retrieval test below. Re-reading your own working code feels productive and teaches almost nothing — recognition isn't recall. Rebuilding from blank is uncomfortable and is where the learning consolidates.

**The honest self-check:** at the end of each project, do the retrieval test cold. If you have to peek at your old code, you copied it rather than learned it. That's not a failure — it just means do that one again before moving on. Two hours redoing Project 2 beats four weeks of confusion in Project 4.

---

## Project 1 — "Stack" · Weeks 2–4 · Foundation

**What you build.** A static dashboard of things you're reading, watching, or building. About twelve items, all rendered from one hardcoded array. Grouped into sections by status. Each row has a status badge whose colour and text come from the data. A summary line at the top — "8 of 12 done" — computed from the array. An empty state for any group with nothing in it.

No buttons. No interactivity. Nothing changes after the page loads. That constraint is deliberate: it forces you to solve *only* the decomposition problem, which is the one beginners skip and then pay for forever.

**What you'll learn.** Splitting a page into components. Passing data down with props. Composition via `children`. Rendering lists with stable keys. Conditional rendering. Deriving values instead of storing them. Why components must be pure.

**Break it on purpose.** Use the array index as your `key`. Then reorder the array. Watch the badges attach to the wrong rows. Now switch to a stable `id` and watch it fix itself. This costs ten minutes and inoculates you against a bug that will otherwise ambush you in Project 2.

**Success criteria.**

- *It works:* adding a thirteenth object to the array updates the list, the correct group, its badge, and the summary — and you changed nothing else.
- *You understand it:* given a screenshot of any website, you can sketch its component tree and say which props flow where, in under five minutes.
- *Retrieval test:* from an empty file, rebuild the `Card` / `ProfileCard` composition with `children`, no reference, in under twenty minutes.

## Project 2 — "Tally" · Weeks 5–7 · New concepts

**What you build.** A task manager: add, toggle complete, edit in place, delete, filter by all/active/done, clear completed, count remaining. Then — once it fully works — **rebuild the state layer with `useReducer`** and confirm the behaviour is identical.

The Score Keeper (Week 5) and the Signup Form (Week 6) are warm-ups that feed straight into this. Treat them as exercises, not projects.

**What you'll learn.** `useState`. Event handling. React's render model and why state is a snapshot. Controlled inputs and form validation. Immutable array and object updates. Lifting state up. `useReducer`, and — because you'll have written both — an actual felt sense of when it's worth it.

**Break it on purpose.** Three scripted failures, all worth doing:

1. Write a "+3" button as three separate `setScore(score + 1)` calls. It adds 1. Sit with that for a minute before fixing it with `setScore(s => s + 1)`.
2. Do `items.push(newItem)` then `setItems(items)`. Nothing renders. This is *the* React beginner bug and you should meet it under controlled conditions rather than at 11pm in Week 12.
3. Delete the `value` prop from a controlled input and read the warning React gives you.

**Success criteria.**

- *It works:* every operation works, editing in place doesn't lose your cursor, and the reducer version is behaviourally identical to the useState version.
- *You understand it:* you can explain out loud, using your own +3 button, why three `setScore(score + 1)` calls only add 1 — without saying the words "because it's asynchronous" as if that were an explanation.
- *Retrieval test:* from an empty file, write add / toggle / remove / update over an array of objects, with no mutation, correct on the first run.

## Project 3 — "Pokédex" · Weeks 8–10 · Real-world application

**What you build.** A searchable, paginated Pokédex against [pokeapi.co](https://pokeapi.co). Click through to a detail page. Search term lives in the URL so `/?q=pika` is shareable and the back button works. Every one of the four data states handled explicitly: loading, error, empty results, success.

This is the first project where you don't control the data. The API returns what it returns, at the speed it returns it, and sometimes it fails. That shift — from data you invented to data you receive — is what makes it real-world.

**What you'll learn.** `useEffect` and cleanup. Custom hooks. Async data with all its states. Debouncing. Race conditions. Client-side routing, nested layouts, and treating the URL as state you don't have to manage.

**Break it on purpose.** The centrepiece of this project, and the reason it's here:

Throttle your network to Slow 3G in DevTools. Type "pika" quickly. Request A fires, then request B. A resolves *after* B and overwrites the correct results with stale ones. Reproduce it deliberately, watch it happen, then fix it with an `AbortController` in the effect cleanup.

This is a genuine production bug that essentially no beginner tutorial mentions, and being able to describe it is a small but real signal in an interview.

Second, smaller: remove the cleanup from your window-resize listener and watch listeners pile up.

**Success criteria.**

- *It works:* all four states render sensibly, the race condition is fixed and you can demonstrate it was there, every view has its own URL, and browser back/forward behaves correctly.
- *You understand it:* you can point at a place in your own code where you nearly reached for `useEffect` and didn't need to, and say what you did instead.
- *Retrieval test:* from an empty file, write a `useFetch` hook including cleanup and error handling, in under thirty minutes.

## Project 4 — "Shelf" · Weeks 11–14 · The challenge

**What you build.** A book library manager in TypeScript. Four routes (list, create, detail, edit). Full create/read/update/delete. State in a reducer, delivered through Context. Persisted to `localStorage`. Filter and sort held in the URL. Around eight tests.

**Why this one is hard, and why that's the point.** Every project before this handed you something. Project 1 had a layout to copy. Project 3 had an API that defined your data shape. Here, nothing is given. *You* decide the `Book` type, the reducer's action union, the route structure, what happens on failure. Deciding those things badly and then living with your decision for three weeks is the single most educational experience in this plan.

**Problems you have to solve yourself.** These aren't extras — they're the curriculum:

1. Design the `Book` type and the typed action union with no reference implementation to copy.
2. Handle `/books/999` where the book doesn't exist.
3. Put deliberate garbage into localStorage via DevTools and make the app degrade gracefully instead of white-screening.
4. Decide what "delete" means — hard delete, confirmation, undo — and defend the choice in your README.
5. Write tests that survive a CSS refactor. This forces you to query by role and label, which in turn forces you to write accessible markup. That chain of consequences is the lesson.

**Success criteria.**

- *It works:* full CRUD, data survives a refresh, deployed to Netlify or Vercel and openable on your phone.
- *It's typed:* zero `any`, zero `@ts-ignore`, and dispatching a bogus action is a compile error rather than a runtime surprise.
- *It's tested:* around eight meaningful tests pass, and deliberately breaking a component produces a failure message that tells you what broke.
- *The real signal:* somewhere in these four weeks you'll hit a bug you can't google verbatim, and you'll diagnose it from your own reasoning plus DevTools. Write that one up in `stuck.md`. That's the moment you stop being a beginner, and it's worth being able to point at.

## Project 5 — "Shelf, full-stack" · Weeks 15–16 · Portfolio piece

**What you build.** Your own Express + MongoDB API, deployed. Then Shelf rewired to talk to it instead of localStorage: every operation async with its own loading state, server validation errors surfaced onto the right form fields, optimistic delete that rolls back if the server refuses, environment variables separating dev from prod, and MSW mocking the network in your tests.

**What you'll learn.** Designing HTTP endpoints. Server-side validation and why client-side validation is a convenience, not a control. CORS, which will humiliate you exactly once. Deployment and environment config. Optimistic UI. Mocking at the network boundary rather than mocking your own modules.

**Why this is the portfolio piece.** A client-side CRUD app is the most common junior portfolio project in existence and reviewers are numb to it. A deployed full-stack CRUD app with real error handling, tests that mock the network, and a written architectural post-mortem is a different category of artefact. Note that the differentiator isn't the stack — MERN is unremarkable — it's the error handling and the write-up. Those are what suggest judgement, and judgement is what juniors are actually assessed on.

**Success criteria.**

- *It works:* deployed frontend talks to deployed backend, data persists across devices, and killing the backend produces a sensible error message rather than a blank page.
- *It's usable by others:* someone can clone both repos, follow your README, and have it running locally in under ten minutes. Test this on a friend if you can — you'll be surprised what you left out.
- *It's defensible:* a post-mortem naming three things you'd architect differently and why. This document is worth more in interviews than the code is.

**A note on the personal site (Weeks 17–18).** It isn't project six. It's the display case — the thing that presents these five and makes them findable. Building it teaches you pre-rendering and deployment, but its job is to frame the work, not to be the work. Keep it plain and ship it.

---

## The stack, as of August 2026

| Thing | Version | Notes |
|---|---|---|
| React | 19.2 | Current. Docs at react.dev are for this. |
| Node | 22 LTS | React Router 8 requires 22.22+. Install this first. |
| Vite | 7.x | Your build tool. `npm create vite@latest` |
| React Router | 8.3 | Package is `react-router`. **Not** `react-router-dom`. |
| TypeScript | current | Via Vite's `react-ts` template from Week 11. |
| Vitest + React Testing Library | current | Testing, from Week 14. |
| Express + MongoDB | current | Backend, Weeks 15–16. |

Editor: VS Code with the ESLint and Prettier extensions. Browser: install [React Developer Tools](https://react.dev/learn/react-developer-tools) in Week 1 — you'll use the Components tab constantly from Week 5 onward.

---

# Phase 0 — Warm-up

## Week 1: The JavaScript React actually needs, plus toolchain

**Why this week exists:** React is "just JavaScript" right up until it isn't. Six JS features do 90% of the work in a React codebase, and if any of them are fuzzy you'll misdiagnose a JS problem as a React problem for the next four months.

**Learn — the six things:**

1. **Destructuring** — objects, arrays, nested, with defaults. Every component you write starts with `function Card({ title, author = 'Unknown' })`.
2. **Spread and rest** — `{...obj}`, `[...arr]`, `(...args)`. This is how you update state without mutating it. This is the big one.
3. **Array methods** — `.map()`, `.filter()`, `.find()`, `.reduce()`. `.map()` renders every list you will ever build.
4. **Arrow functions and implicit return** — including the `() => ({ ... })` parenthesis trap when returning an object literal.
5. **`import` / `export`** — named vs default, and why `import React from 'react'` vs `import { useState } from 'react'` differ.
6. **Promises, `async`/`await`, `fetch`, `try`/`catch`** — plus optional chaining `?.` and nullish coalescing `??`.

**Read:** [javascript.info](https://javascript.info) for any of the six that feel shaky — it's better than MDN for learning, MDN is better for reference. Skip anything about classes, prototypes, or `this`; modern React doesn't use them.

**Build — the immutability drill.** In a plain `.js` file, no React, write four functions over an array of `{ id, text, done }` objects:

```js
addItem(items, text)        // returns a NEW array with one more item
toggleItem(items, id)       // returns a NEW array, one item's `done` flipped
removeItem(items, id)       // returns a NEW array, one item gone
updateItem(items, id, text) // returns a NEW array, one item's text changed
```

Hard rule: no `push`, `splice`, `sort`, or `items[0].done = true`. The original array must be untouched — verify by logging it before and after. Run it with `node yourfile.js`.

This looks trivial. It is the exact logic inside your Week 7 to-do reducer and your Week 12 CRUD app. Getting it into your fingers now means those weeks are about React instead of about arrays.

**Also this week — set up the toolchain:**

- Install Node 22 LTS, confirm with `node -v`
- Install VS Code + ESLint + Prettier extensions
- Install React DevTools in your browser
- `npm create vite@latest hello-react -- --template react`, then `npm install && npm run dev`
- Create a GitHub account if you don't have one, push `hello-react` to it

**Done when:** the four functions pass your own console checks without mutating, and `npm run dev` shows a Vite React app in your browser.

**Watch out for:** `const` doesn't make objects immutable — `const arr = [1,2]; arr.push(3)` works fine and is exactly the bug React won't warn you about. Immutability is a discipline you enforce, not something the language does for you.

---

# Phase 1 — Foundations & static UI (Weeks 2–4)

**Building: Project 1, "Stack."**

**Goal:** think in components. Break a page into pieces, pass data down, render lists. No interactivity yet — that's deliberate.

## Week 2: Components, JSX, props

**Read:**

- [Quick Start](https://react.dev/learn) — the whole page, ~30 min
- [Your First Component](https://react.dev/learn/your-first-component)
- [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)

Do the exercises at the bottom of each page. They're short and they're the best part of these docs.

**Build — Profile Cards.** A page showing 6 people as cards: photo, name, role, a short bio, a couple of tags. One `<ProfileCard>` component used six times with different props. Data lives in a hardcoded array at the top of the file.

Then do the thing that actually teaches composition: build a generic `<Card>` component that takes `children`, and make `<ProfileCard>` use it. Now you understand why `children` exists.

**Done when:** six visually distinct cards render from one component, and you can add a seventh person by adding one object to the array and nothing else.

**Watch out for:** `class` → `className`. Every JSX element must close (`<br />`). A component can only return one root element — use a `<>...</>` fragment. Components must start with a capital letter or React renders them as unknown HTML tags and gives you a confusing empty page.

## Week 3: Lists, keys, conditionals, purity

**Read:**

- [Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [Understanding Your UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree)

**Build — "Stack," your static dashboard.** This is Project 1 proper; Week 2 was the warm-up. Pick something you'd actually look at: a reading list, a project tracker, a list of repos. Requirements:

- Rendered entirely from one hardcoded array of ~12 objects
- Grouped into sections (e.g. "In progress" / "Done") using `.filter()`
- Each row shows a status badge whose colour and text depend on the data — that's your conditional rendering
- An empty state: if a group has no items, render "Nothing here yet" instead of an empty list
- A summary line at the top computed from the array with `.reduce()` — "8 of 12 done"

**Done when:** everything on screen is derived from the array. Nothing is hardcoded in JSX. Change one object's status and the badge, the group it appears in, and the summary all update.

**Watch out for:** the key warning in the console. Use a stable `id` from your data. Using the array index as a key works fine now and will silently corrupt your UI in Week 7 when items get reordered or deleted — so build the habit now, while it's free.

## Week 4: Bridge week — the official tutorial

**Build:** [Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe), the official React tutorial, start to finish. Budget 3–4 hours.

This is a deliberate detour and it's worth it. It gives you a first supervised taste of state, lifting state up, immutable updates, and keys — all four of which you're about to hit properly — with the training wheels of a guided tutorial. When Week 5 introduces `useState` cold, you'll have already seen it work.

Do the "time travel" section at the end. It's the moment where immutability stops being a rule someone told you and starts being obviously useful.

**Done when:** the game works including move history, and you've done at least two of the four improvement challenges listed at the end of the tutorial.

**Watch out for:** don't skip ahead to Week 5 if this feels shaky. Redo it from scratch without looking — it's only a couple of hours the second time and it's the best value in the whole plan.

---

# Phase 2 — Interaction, state, forms (Weeks 5–7)

**Building: Project 2, "Tally."** Weeks 5 and 6 are warm-ups that feed into it.

**Goal:** make it move. By the end of this phase you can build any single-page interactive UI that doesn't need a server.

## Week 5: useState, events, and how rendering actually works

**Read:**

- [Responding to Events](https://react.dev/learn/responding-to-events)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) ← read this twice
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)

**Build — Score Keeper.** Two teams, each with a score. Buttons for +1, +2, +3 and −1. A reset button. Highlight whoever's leading. Track and display the number of lead changes.

Then deliberately break it to learn something: write a "+3" button as three separate `setScore(score + 1)` calls. It'll add 1, not 3. Now fix it with the updater form `setScore(s => s + 1)`. That five-minute experiment teaches you more about React's render model than the docs page does.

**Done when:** scores update correctly, the leader highlight is derived (not stored in its own state variable), and you can explain out loud why three `setScore(score + 1)` calls in a row only add 1.

**Watch out for:** state updates aren't immediate. `setCount(5); console.log(count);` logs the *old* value. This confuses everyone once. Also: if you can calculate something from existing state, calculate it during render — don't put it in its own `useState`. The "who's leading" flag is the test case.

## Week 6: Controlled inputs and forms

**Read:**

- [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

**Build — Signup form with validation.** Fields: name, email, password, confirm password, a country dropdown, a terms checkbox. Requirements:

- Every input is controlled (`value` + `onChange`)
- Field-level validation with errors shown under each field
- Errors appear on blur, not on every keystroke — typing "e" shouldn't immediately shout "invalid email"
- Submit is disabled until the form is valid
- On submit: fake a 1.5s network delay, show a spinner, then a success message
- Add a "simulate server error" toggle so you're forced to handle the failure path too

Model the form's overall status as one state variable — `'editing' | 'submitting' | 'success' | 'error'` — rather than four separate booleans. This is the single most useful state-shape habit in React and you'll reuse it in every data-fetching component from Week 8 onward.

**Done when:** you can't submit an invalid form, errors are readable and appear at sensible moments, and both the success and error paths work.

**Watch out for:** `value` without `onChange` gives you a read-only input and a console warning. Never `useState` a field that's derivable — `fullName` should be computed from `firstName + lastName`, not stored. And use real `<label>` elements with `htmlFor`; you'll need them for Week 14's tests, which query the DOM the way a user would.

## Week 7: Arrays and objects in state, and your first reducer

**Read:**

- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)

**Build — "Tally," your task manager.** Add, toggle complete, edit in place, delete. Filter by all/active/done. A "clear completed" button. A count of remaining items.

Build it first with `useState` and the immutable helpers from Week 1 — you'll notice they're nearly identical to what you wrote in the drill. Then, once it works, **refactor it to `useReducer`**. Same behaviour, different shape. Doing both back-to-back on the same app is what makes the difference between the two obvious, and you'll pick `useReducer` correctly in Week 12 because of it.

**Done when:** all operations work, editing in place doesn't lose your cursor position, and the reducer version behaves identically to the useState version.

**Watch out for:** `.sort()` and `.reverse()` mutate in place — copy first (`[...items].sort()`). React DevTools' Components tab is now genuinely useful; keep it open and watch state change as you click. The docs will suggest [Immer](https://github.com/immerjs/use-immer) for deeply nested state — it's a good library, but skip it for now and keep your state flat instead. Flat state is the actual fix; Immer is what you reach for when you can't have it.

---

# Phase 3 — Effects, data, and routing (Weeks 8–10)

**Building: Project 3, "Pokédex."** Week 8 is drills; Weeks 9–10 are the project.

**Goal:** talk to the outside world and build something that has more than one page.

## Week 8: useEffect, properly

**Read, in this order:**

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) ← the most valuable page on react.dev
- [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)
- [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)

Beginners overuse `useEffect` more than any other hook, by a wide margin. "You Might Not Need an Effect" is the antidote and it's worth two careful reads.

**Build — small and focused, no big project this week:**

1. A component that fetches one thing from a public API and displays it. Handle loading and error states.
2. A `useDocumentTitle(title)` custom hook.
3. A `useLocalStorage(key, initialValue)` custom hook that behaves like `useState` but persists. You'll use this again in Week 13.
4. A window-resize listener with a proper cleanup function — then delete the cleanup and watch what breaks.

**Done when:** all four work, and you can explain what the cleanup function is for and why React runs your effect twice in development.

**Watch out for:** an effect with no dependency array runs after *every* render — combine that with `setState` inside and you have an infinite loop. Trust the ESLint exhaustive-deps rule; when it complains, fix the code rather than silencing the rule. And note the framing: an effect *synchronizes with an external system*. If there's no external system, you probably don't need one.

## Week 9: Real data fetching — Pokédex

**Read:** [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

**Build — Pokédex** against [pokeapi.co](https://pokeapi.co) (free, no auth, well documented).

- A searchable, paginated list
- Click through to a detail view with stats, types, sprites
- Every one of the four states handled explicitly: **loading**, **error**, **empty results**, **success**
- Debounce the search input so you're not firing a request per keystroke
- Pull the fetching logic into a `useFetch` custom hook

The lesson that makes this week worth it: **stale responses**. Type "pika" fast — request A fires, then request B. If A is slow it can resolve *after* B and overwrite the correct results with stale ones. Reproduce it (throttle your network in DevTools), then fix it with an `AbortController` in the effect cleanup. This is a real bug in real production apps and almost no tutorial covers it.

**Done when:** search works smoothly, all four states render sensibly, and the race condition is fixed and you can demonstrate why.

**Watch out for:** `fetch` doesn't throw on 404 or 500 — you must check `response.ok` yourself. Also: at this point you'll see people recommending TanStack Query, and they're right for production. Don't use it yet. Write the loading/error/caching logic by hand once so you understand what the library is doing for you.

## Week 10: Routing

**Read:**

- [Picking a Mode](https://reactrouter.com/start/modes) — React Router has three; you want **declarative** to start
- [Declarative: Installation](https://reactrouter.com/start/declarative/installation)
- [Declarative: Routing](https://reactrouter.com/start/declarative/routing)
- [Declarative: URL Values](https://reactrouter.com/start/declarative/url-values)

**Install `react-router`.** Not `react-router-dom` — that package no longer exists as of v8. If a tutorial tells you otherwise, the tutorial is from before June 2026.

**Build — add routing to your Pokédex:**

- `/` list, `/pokemon/:name` detail, `/about`, and a 404 catch-all
- A shared layout with nav, using `<Outlet />`
- `<NavLink>` for nav links so the active one styles itself
- Search term in the URL via `useSearchParams` — so `/?q=pika` is shareable and the back button works

That last one is the point of the week. State that lives in the URL is state you don't have to manage, and it makes your app behave like a real website.

**Done when:** every view has its own URL, browser back/forward works correctly, and you can send someone a link to a specific Pokémon and to a specific search.

**Watch out for:** most routing tutorials you'll find are for v6 or v7. The concepts carry over but the imports don't. When in doubt, reactrouter.com over blog posts. Once declarative mode clicks, skim [Data mode](https://reactrouter.com/start/data/installation) to see what loaders and actions do — you don't need them yet, but you should know they exist.

---

# Phase 4 — TypeScript & the CRUD milestone (Weeks 11–13)

**Building: Project 4, "Shelf"** — starts here, finishes in Week 14 with tests.

**Goal:** the centrepiece. A real CRUD app, typed, with routing and persistence.

## Week 11: TypeScript with React

**Read:**

- [Using TypeScript](https://react.dev/learn/typescript) — React's own guide, start here
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — the community reference, bookmark it
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/): the "Everyday Types" and "Narrowing" chapters only

**What you actually need** (ignore the rest of TypeScript for now):

- Typing props with an `interface`
- `type` unions for state: `type Status = 'idle' | 'loading' | 'success' | 'error'`
- Typing `useState` when inference isn't enough: `useState<Book[]>([])`
- Event types: `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`
- `React.ReactNode` for `children`
- Typing a `useReducer` action union — this is where TS starts paying you back

**Build:** new Vite project with `npm create vite@latest -- --template react-ts`. Port your Week 5 Score Keeper and Week 7 To-Do into it. Small enough to finish in a session, big enough to hit real typing problems.

**Done when:** both apps compile with zero `any` and zero `@ts-ignore`, and your to-do reducer's action union is typed so that dispatching a bogus action is a compile error.

**Watch out for:** you will want to write `any` to make an error go away. Every time you do, you've deleted the reason you're using TypeScript. Ask for help on the type instead. Also: `.tsx` for files with JSX, `.ts` for files without.

## Week 12: Shelf — create and read

**Read:**

- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)

**Build — Shelf, part 1.** TypeScript + Vite + React Router from the start.

- Routes: `/books` (list), `/books/new` (create), `/books/:id` (detail), `/books/:id/edit`
- A `Book` type: id, title, author, status (`want-to-read` | `reading` | `finished`), rating, notes, dateAdded
- `useReducer` holding the book list, exposed through Context so any route can reach it
- A typed custom hook `useBooks()` that reads the context and throws a clear error if used outside the provider
- Create and Read working end to end. Reuse the form patterns from Week 6.

**Done when:** you can add a book from `/books/new`, get redirected to its detail page, and see it in the list.

**Watch out for:** Context is not a state manager — it's a delivery mechanism. The reducer holds the state; Context just carries it down the tree. Also, in React 19 you render the provider as `<BooksContext value={...}>`, not `<BooksContext.Provider value={...}>`. The old form still works but is being phased out, and older tutorials all use it.

## Week 13: Shelf — update, delete, persist

**Build — Shelf, part 2:**

- Edit an existing book (pre-populate the form from the current record)
- Delete with a confirmation step
- **Persist everything to `localStorage`** — reuse your Week 8 `useLocalStorage` hook, or write a small effect that syncs the reducer state on change
- Filter by status and sort by title/rating/date added, with both in the URL via `useSearchParams`
- Handle the edge cases: `/books/999` for a book that doesn't exist, an empty library, corrupted localStorage JSON

That last one is worth doing properly: manually put garbage into localStorage via DevTools and make sure your app degrades gracefully instead of white-screening. Wrapping `JSON.parse` in a `try/catch` is a two-line fix that separates a toy from something you'd show someone.

**Done when:** full CRUD works, your data survives a page refresh, and you've deployed it to Netlify or Vercel and can open it on your phone.

**This is your first real portfolio piece.** Write a proper README: what it does, a screenshot, how to run it, what you'd do differently. Take the README seriously — for a junior portfolio it's often read before the code is.

**Watch out for:** localStorage is synchronous and capped at ~5MB. Fine here, wrong for real apps — which is exactly what Weeks 15–16 fix.

---

# Phase 5 — Testing & full-stack (Weeks 14–16)

**Building:** Week 14 finishes Project 4. Weeks 15–16 are Project 5.

**Goal:** the things that separate "I did a tutorial" from "I can work on a team's codebase."

## Week 14: Testing

**Read:**

- [Vitest getting started](https://vitest.dev/guide/)
- [React Testing Library docs](https://testing-library.com/docs/react-testing-library/intro/)
- The [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/) — short, and it's the whole philosophy

**Setup:** `npm i -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`, then set `environment: 'jsdom'` in your Vitest config.

**Build — tests for Shelf:**

- Rendering: a book card shows title, author and status
- Interaction: filling the add form and submitting creates a book in the list
- Interaction: clicking delete then confirming removes it
- Validation: submitting an empty form shows errors and doesn't create anything
- Edge case: an empty library shows the empty state

The rule that makes tests worth writing: **query the way a user would.** `getByRole('button', { name: /add book/i })` and `getByLabelText('Title')` — not `getByTestId`, not class names. Tests written that way survive refactors and catch real accessibility problems. Tests bound to implementation details break every time you touch the CSS and teach you nothing.

Use `userEvent`, not `fireEvent` — it simulates what actually happens when a human clicks (focus, mousedown, mouseup, click) rather than dispatching one synthetic event.

**Done when:** `npm test` passes with ~8 meaningful tests, and deliberately breaking a component makes a test fail with a message that tells you what broke.

**Watch out for:** don't chase coverage percentages. Eight tests on the paths that matter beat forty on getters. And if a component is hard to test, that's usually the component's fault, not the test's.

## Week 15: The backend

**Build — an Express + MongoDB API.** No React this week at all. Separate repo.

- MongoDB Atlas free tier (managed, no local install)
- Express with Mongoose, a `Book` schema matching your frontend type
- `GET /api/books`, `GET /api/books/:id`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id`
- Server-side validation — never trust the client
- Proper status codes: 200, 201, 400, 404, 500
- Secrets in `.env`, and `.env` in `.gitignore` **before** your first commit
- CORS configured so your React dev server can call it

Test it entirely without a frontend using [Bruno](https://www.usebruno.com) or Postman. Getting comfortable poking an API directly is a genuinely useful skill and it isolates backend bugs from frontend bugs.

**Done when:** all five endpoints work from your API client, invalid data is rejected with a 400 and a useful message, and the API is deployed (Render and Railway both have usable free tiers).

**Watch out for:** MongoDB is a fine choice for learning and it's what the plan you brought specifies — but be aware that for structured, related data like this, a SQL database (Postgres via Supabase or Neon) is the more common default in 2026 and more common in junior job listings in the Netherlands. Worth a look after this plan; not worth switching mid-stream.

## Week 16: Wire it together

**Build:**

- Point Shelf at your real API instead of localStorage
- Every operation now async: loading states on all four CRUD actions
- Real error handling — network failure, server down, validation errors from the server rendered on the right form fields
- Optimistic updates on delete (remove from UI immediately, restore if the server rejects it)
- Environment variables for the API URL so dev and production differ
- Update your Week 14 tests to mock the network with [MSW](https://mswjs.io) instead of hitting a real server

**Done when:** the deployed frontend talks to the deployed backend, data persists across devices, and killing the backend produces a sensible error message instead of a blank page.

**This is now a legitimate full-stack portfolio project.** Rewrite the README to match.

**Watch out for:** CORS will bite you in production even though it worked locally. Your deployed frontend's domain has to be in the backend's allowed origins list. Budget an hour of confusion for this specifically; everyone loses it once.

---

# Phase 6 — Personal site capstone (Weeks 17–18)

## Week 17: Build it

**Why not a plain Vite SPA:** a client-rendered SPA sends an empty HTML shell and fills it in with JavaScript. Search engines handle that inconsistently, link previews on LinkedIn and Slack often come out blank, and first paint is slower. For a personal site — a document, mostly — you want real HTML in the response.

**Use React Router's framework mode with pre-rendering.** Same React you've written for four months, plus a config that generates static HTML at build time.

**Read:**

- [Framework mode: Installation](https://reactrouter.com/start/framework/installation)
- [Pre-Rendering](https://reactrouter.com/how-to/pre-rendering)
- [Rendering Strategies](https://reactrouter.com/start/framework/rendering)

**Build:**

- Home page: who you are, what you're looking for, links
- Projects: your 8 repos from this plan, with the good ones written up properly
- About
- A contact form wired to [Formspree](https://formspree.io) or similar — no backend needed
- Responsive, dark mode, real `<meta>` tags for link previews
- Pre-render every route to static HTML

**Done when:** it builds to static files, works with JavaScript disabled for the content pages, and pasting the URL into a chat app produces a proper preview card.

**Watch out for:** scope creep. You're at the end of an 18-week plan and it's tempting to make this the perfect site. Ship a plain, fast, well-written three-page site. A blog engine can wait.

## Week 18: Deploy, polish, consolidate

- Deploy to Netlify, Vercel or Cloudflare Pages — all free for this
- Custom domain if you want one (~€10/yr)
- Lighthouse audit; fix anything below 90
- Real accessibility pass: keyboard-only navigation, alt text, colour contrast, heading order
- Clean up all 8 repos: READMEs, screenshots, delete dead code, sensible commit history
- Write one post-mortem of the Shelf: what you'd architect differently now. This is the single best interview-prep artefact in the plan — it demonstrates judgement, which is what juniors are actually assessed on.

**Done when:** your site is live on a domain you control, and every project on it is one click from working code.

---

# 2026 traps

Things where the internet's collective advice is now wrong. Read this before Week 10.

**`react-router-dom` no longer exists.** React Router 8 (June 2026) removed the package. Install `react-router`. A few DOM-specific exports come from `react-router/dom`. Every pre-2026 tutorial gets this wrong.

**`<Context.Provider>` → `<Context>`.** React 19 lets you render the context object directly as the provider. The old form still works but is deprecated and every older tutorial uses it.

**You probably don't need `useMemo` and `useCallback`.** React Compiler (v1.0, October 2025) memoizes automatically, and React's own docs now note this on the `useMemo`/`useCallback` pages. Older tutorials scatter them everywhere as cargo-cult performance advice. Don't optimize until you've measured — and in this plan you won't need to.

**`create-react-app` is dead.** If a tutorial starts with `npx create-react-app`, close it — it's at minimum three years stale and everything else in it will be too. Vite.

**`useEffectEvent` is now stable** and imports from `react` directly. Tutorials referring to it as experimental with an `experimental_` prefix are out of date.

**React 19.2 is current, React 18 is still everywhere.** Learn 19. But expect to meet 18 codebases in jobs, and know that `<Context.Provider>`, `forwardRef`, and manual `useMemo` are what you'll find there.

**Check the date on everything.** React tutorials rot faster than almost any other technology's. If it's older than 2025, assume the APIs have moved. react.dev and reactrouter.com are the ground truth.

---

# What to deliberately skip

You will be told you need these. You don't, not yet.

**Redux / Zustand / Jotai** — `useState` + `useReducer` + Context covers everything in this plan. Learn a state library when you feel the specific pain it solves, not before.

**Next.js** — excellent, and the industry default for new production apps. But it hides how React works behind conventions, and hidden mechanics are the last thing you want while learning. Pick it up after Week 18; it'll take about a week from where you'll be.

**Tailwind vs CSS-in-JS vs CSS Modules** — pick plain CSS or CSS Modules and stop thinking about it. Styling debates consume enormous learner time for zero learning.

**Class components, `this.setState`, lifecycle methods** — only relevant for maintaining old code. Skip entirely; learn them if a job requires it.

**Server Components, SSR internals, Suspense for data** — genuinely advanced, framework-level, and irrelevant to everything you're building here.

**GraphQL** — REST is what you'll meet in most junior roles. One thing at a time.

---

# Progress checklist

- [ ] **W1** JS warm-up + toolchain

**Project 1 — Stack**

- [ ] **W2** Profile Cards
- [ ] **W3** Static dashboard
- [ ] **W4** Tic-Tac-Toe
- [ ] Retrieval test: `Card`/`ProfileCard` composition from empty, <20 min

**Project 2 — Tally**

- [ ] **W5** Score Keeper (warm-up)
- [ ] **W6** Signup form (warm-up)
- [ ] **W7** Task manager — useState version, then useReducer version
- [ ] Retrieval test: four immutable array ops from empty, correct first run

**Project 3 — Pokédex**

- [ ] **W8** Effects + custom hooks (drills)
- [ ] **W9** Pokédex — search, detail, four states, race condition fixed
- [ ] **W10** Pokédex — routing, URL as state
- [ ] Retrieval test: `useFetch` with cleanup from empty, <30 min

**Project 4 — Shelf**

- [ ] **W11** TypeScript conversions
- [ ] **W12** Shelf: create + read
- [ ] **W13** Shelf: update, delete, persist — **deployed** ⭐
- [ ] **W14** Tests — ~8, querying by role and label
- [ ] One bug diagnosed without Google, written up in `stuck.md`

**Project 5 — Shelf, full-stack**

- [ ] **W15** Express + MongoDB API — **deployed**
- [ ] **W16** Shelf wired to the real API ⭐⭐
- [ ] Post-mortem written: three things you'd do differently

**Display case**

- [ ] **W17** Personal site
- [ ] **W18** Deployed, polished, live ⭐⭐⭐

---

# If you fall behind

You will, somewhere around Week 9 or Week 15. Here's the triage order.

**Never skip:** Projects 2 and 4 (Weeks 5, 7, 12, 13) and the effects drills in Week 8. State, immutable updates, effects, and the CRUD milestone are load-bearing — everything after depends on them.

**Compressible:** Week 4 (tic-tac-toe) if Weeks 2–3 went well. Week 11 (TypeScript) can spread into Week 12 rather than being its own week. Week 14 (testing) can shrink to four tests instead of eight.

**Droppable if you must:** Project 5, the backend. You'd finish with Projects 1–4 and a personal site, which is still a real portfolio — and you can come back to the backend after. Losing it costs you "full-stack" on the CV, so drop it last.

**Never droppable:** the retrieval tests. They're twenty minutes each and they're the only honest signal in the whole plan about whether the previous project actually stuck. Skipping them to save time is how you arrive at Project 4 unable to build it.

**If you stall for two weeks or more:** don't restart from Week 1. Reread your `stuck.md`, rebuild the last project you finished from scratch without looking at your old code, and carry on. Restarting from the beginning is how people spend two years never getting past components.
