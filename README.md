# play_ground

A personal learning playground for React and TypeScript. Each top-level folder is an independent, self-contained project (its own `package.json`, `node_modules`, and README) used to practice a specific concept — there is no shared build or workspace tooling tying them together.

## Repo layout

| Folder | Stack | What it's for |
| --- | --- | --- |
| [`08-how-react-works`](08-how-react-works) | Create React App | A tabbed-content demo app used to explore React 18 internals — rendering, Fiber, and reconciliation. See [Docs](#docs) below. |
| [`far-away`](far-away) | React + TypeScript + Vite | A packing-list app (add, remove, and check off items) for practicing state lifting and component composition. |
| [`step-component`](step-component) | React + TypeScript + Vite | A multi-step form/wizard UI for practicing step-based state management. |
| [`TS`](TS) | TypeScript (no framework) | A sandbox of standalone TypeScript exercises, starting from fundamentals. |

Each folder has its own README with setup and run instructions (typically `npm install` followed by `npm start` or `npm run dev`, depending on the tooling).

## Docs

- [How React Works Behind the Scenes](08-how-react-works/doc/how-react-work.md) — a guide to React 18's render pipeline, covering JSX-to-element compilation, Fiber, reconciliation/diffing, the render and commit phases, hooks/batching, and common misconceptions, written alongside the `08-how-react-works` project.
