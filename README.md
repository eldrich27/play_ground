# play_ground

A personal React and TypeScript learning playground for building, testing, and documenting small frontend concepts in isolated projects.

## Current progress

This repo now contains a mix of core React practice apps, TypeScript fundamentals, and a more complete quiz app that exercises state, async data loading, and timer-based UX.

## Repo layout

| Folder | Stack | What it's for |
| --- | --- | --- |
| [`08-how-react-works`](08-how-react-works) | React + Create React App | A conceptual app for exploring React internals, rendering behavior, Fiber, and reconciliation. |
| [`far-away`](far-away) | React + TypeScript + Vite | A packing-list app used to practice state lifting, derived values, and component composition. |
| [`react-quiz`](react-quiz) | React + TypeScript + Vite | A complete quiz game that demonstrates reducer-based state management, conditional rendering, fetching local data, and a countdown timer. |
| [`step-component`](step-component) | React + TypeScript + Vite | A step-based UI for practicing multi-step flows and controlled state transitions. |
| [`TS`](TS) | TypeScript (no framework) | A foundational TypeScript practice space for types, interfaces, and function patterns. |

## Featured app

- [react-quiz](react-quiz) — the most complete app in the repo right now, focused on real-world React patterns and interactive UI behavior.

## Docs and learning notes

- [How React Works Behind the Scenes](08-how-react-works/doc/how-react-work.md) — a guide to React 18's render pipeline, covering JSX-to-element compilation, Fiber, reconciliation/diffing, the render and commit phases, hooks/batching, and common misconceptions.

## Notes

Each folder is an independent project with its own dependencies and setup steps. The repo is meant to be a hands-on learning space rather than a single production app, and the focus is on progressive understanding of React, TypeScript, and frontend state patterns.
