# play_ground

A personal React and TypeScript learning playground for building, testing, and documenting small frontend concepts in isolated projects.

## Current progress

This repo now contains a mix of core React practice apps, TypeScript fundamentals, a quiz app that exercises state, async data loading and timer-based UX, and **WorldWise**, a multi-page travel tracker that brings routing, global state, maps and authentication together in one app.

## Repo layout

| Folder | Stack | What it's for |
| --- | --- | --- |
| [`08-how-react-works`](08-how-react-works) | React + Create React App | A conceptual app for exploring React internals, rendering behavior, Fiber, and reconciliation. |
| [`far-away`](far-away) | React + TypeScript + Vite | A packing-list app used to practice state lifting, derived values, and component composition. |
| [`react-quiz`](react-quiz) | React + TypeScript + Vite | A complete quiz game that demonstrates reducer-based state management, conditional rendering, fetching local data, and a countdown timer. |
| [`step-component`](step-component) | React + TypeScript + Vite | A step-based UI for practicing multi-step flows and controlled state transitions. |
| [`worldwise`](worldwise) | React + TypeScript + Vite | A multi-page travel tracker with an interactive map, used to practice React Router, the Context API, `useReducer`, custom hooks and protected routes. |
| [`TS`](TS) | TypeScript (no framework) | A foundational TypeScript practice space for types, interfaces, and function patterns. |

## Featured app: WorldWise

**[→ Open the WorldWise app and its setup guide](worldwise)**

WorldWise lets you click anywhere on a world map, works out which city you clicked, and saves it with the date you went and your notes. Your trips show up as pins on the map, in a list of cities, and grouped by country.

### Why it was built

The earlier apps here each practice one idea in a single screen. WorldWise was built to see how those ideas hold up together in a **real, multi-page app**:

- **Routing at scale:** nested routes, an `<Outlet />` layout, URL parameters, and keeping the map position in the query string so it survives a reload.
- **Moving from prop drilling to global state:** the cities started as state in `App` passed down through props, then moved into the **Context API** once too many components needed them.
- **`useReducer` for related state:** both contexts handle their changes through typed actions instead of several `useState` calls.
- **Real-world async work:** fetching from a mock REST API (json-server), reverse geocoding, the browser's Geolocation API, and loading and error states throughout.
- **Third-party libraries:** fitting Leaflet maps and a date picker into React components and a consistent theme.
- **Authentication flow:** a fake login, protected routes, and a session that survives page reloads.

The [WorldWise README](worldwise/README.md) explains each of these concepts in more detail, with code from the app.

### Other apps

- [react-quiz](react-quiz) — a complete quiz game focused on reducer-based state, conditional rendering and a countdown timer.

## Docs and learning notes

- [How React Works Behind the Scenes](08-how-react-works/doc/how-react-work.md) — a guide to React 18's render pipeline, covering JSX-to-element compilation, Fiber, reconciliation/diffing, the render and commit phases, hooks/batching, and common misconceptions.

## Notes

Each folder is an independent project with its own dependencies and setup steps. The repo is meant to be a hands-on learning space rather than a single production app, and the focus is on progressive understanding of React, TypeScript, and frontend state patterns.
