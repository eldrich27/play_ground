# React Quiz App

A small interactive quiz application built with React and TypeScript to practice core frontend concepts such as state management, conditional rendering, async data fetching, and timer-driven gameplay.

<div align="left">

![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-~6.0.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24.13.3-339933?logo=node.js&logoColor=white)
![Oxlint](https://img.shields.io/badge/Oxlint-1.81.0-8A2BE2?logo=eslint&logoColor=white)

</div>

## Overview

This project is a React-based quiz game where users:

- start a quiz from a landing screen
- answer multiple-choice questions one by one
- track their score as they go
- receive instant feedback on correct and incorrect answers
- see a countdown timer for each round
- finish with a results screen including the high score

It is designed as a practical learning app for understanding how React apps manage state and UI transitions in a real workflow.

## Features

- Multiple-choice quiz flow with a start screen and end screen
- Score calculation based on question difficulty/points
- Timer-based gameplay with automatic finish when time runs out
- High score persistence during the active session
- Real data loading from a local JSON source
- Responsive UI with reusable component structure

## Concepts touched upon

### 1. Component-based architecture
The app is split into reusable UI components such as:

- Header
- Main
- StartScreen
- Questions
- Options
- Progress
- Timer
- Footer
- NextButton
- FinishScreen

This demonstrates how a React app can be broken into small, focused pieces for readability and maintainability.

### 2. State management with useReducer
The main application logic is handled with `useReducer`, which is ideal for managing more complex state transitions than a simple `useState` would handle.

The reducer manages actions such as:

- `dataReceived`
- `error`
- `start_quiz`
- `newAnswer`
- `nextQuestion`
- `finishTest`
- `reset`
- `tick`

This keeps all quiz logic in one predictable flow, making it easier to reason about updates and UI transitions.

### 3. Conditional rendering
The UI changes dynamically depending on app status:

- loading
- ready
- error
- active
- finished

This is a core React pattern that shows how components can render different views based on the current state.

### 4. Async data fetching
The app fetches quiz data from a local JSON endpoint using `useEffect` and `fetch`.

This introduces the concept of loading remote/local data before rendering the quiz and handling failure states gracefully.

### 5. Event-driven interaction patterns
Each answer selection, next-question action, reset, and timer tick is driven by dispatched actions, making the application behave predictably and modularly.

### 6. Timers and application lifecycle
A countdown timer reduces the available time per question and ends the quiz when the remaining time reaches zero. This demonstrates how React applications can react to time-based updates in a controlled way.

## Technologies used

### UI and app framework

- React 19.2.8
- React DOM 19.2.8
- TypeScript ~6.0.2

### Build and development tooling

- Vite 8.3.0
- @vitejs/plugin-react 6.1.1
- Oxlint 1.81.0

### Supporting libraries and tools

- Node type definitions 24.13.3
- Local JSON data served with `json-server` via the project script

## Project structure

```text
react-quiz/
├── src/
│   ├── components/
│   ├── data/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── README.md
```

## Running the app

1. Install dependencies:

```bash
npm install
```

2. Start the local data server:

```bash
npm run server
```

3. Start the Vite dev server:

```bash
npm run dev
```

4. Open the local Vite URL in your browser.

## Notes

This app is a practical exercise in understanding how React handles user interaction, state transitions, and reusable component design in a simple but effective quiz experience.
