# TypeScript Learning Journey

This folder is a small sandbox for learning and practicing TypeScript in a modern, strict setup. The goal is not just to memorize syntax, but to understand how TypeScript helps catch bugs earlier, improve editor tooling, and make React and JavaScript projects more reliable.

## Project purpose

The learning flow in this folder is designed around a few principles:

- Start with TypeScript fundamentals before trying advanced patterns.
- Practice using real code examples instead of only reading theory.
- Use strict type-checking to build confidence in correctness.
- Apply the concepts to everyday JavaScript and React scenarios.

## Current setup

This project already includes TypeScript with strict checking enabled.

Key settings in the config:

- `strict: true`
- `target: "esnext"`
- `module: "nodenext"`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `isolatedModules: true`
- `skipLibCheck: true`

These settings encourage safer code and help reinforce good TypeScript habits from the beginning.

## Learning roadmap

### 1. Core TypeScript basics

Focus on:

- Primitive types: `string`, `number`, `boolean`, `null`, `undefined`
- Arrays and objects
- Type inference
- Function signatures and return types
- Optional and default parameters
- Literal types and unions
- Type aliases and interfaces

### 2. Type safety and data modeling

Focus on:

- `interface` vs `type`
- `union` and `intersection`
- `readonly` properties
- index signatures
- mapped types
- enums and alternatives

### 3. Functions and reusable patterns

Focus on:

- Function overloads
- Generic functions
- Constraints on generics
- Utility types such as `Partial`, `Required`, `Pick`, and `Record`
- Writing reusable code without losing type safety

### 4. Type narrowing and control flow

Focus on:

- `if` checks
- `typeof` narrowing
- `in` operator narrowing
- `instanceof` checks
- custom type guards
- handling `null` and `undefined` safely

### 5. Advanced TypeScript patterns

Focus on:

- generic interfaces and classes
- abstract classes and inheritance
- readonly data structures
- asynchrony with `Promise` and `async/await`
- error handling with typed results
- practical patterns used in React and API code

### 6. Real-world application

Once the basics are comfortable, practice by writing small exercises that model:

- user objects and profiles
- API responses
- form state
- component props in React
- event handlers and callbacks
- reusable helpers and validation logic

## Suggested learning flow

1. Read a concept and write a tiny example.
2. Run the code with TypeScript checks enabled.
3. Fix any type errors before moving on.
4. Refactor the same example into a more reusable version.
5. Repeat with a slightly more realistic problem.

This repetition is the key to building intuition.

## Commands to use

From this folder:

```bash
npm install
npx tsc --noEmit
npx tsx your-file.ts
```

Use `npx tsc --noEmit` often to validate the code without generating output files. This is a very effective habit while learning.

## Notes for this project

This TypeScript folder is meant to be a practice area, not a production app. The focus is on understanding how types shape the code and how strict checks lead to better design decisions.

## Learning goals

By the end of this exercise, the goal is to be comfortable with:

- writing typed variables and functions
- modeling data with interfaces and type aliases
- understanding generic functions and reusable types
- narrowing values safely
- using TypeScript confidently in React and JavaScript-based projects

## Next steps

A good next progression would be:

- build small TypeScript utilities
- practice React props typing
- work with async API data
- move from examples to a small app feature

The most important habit is to keep writing and checking code every day.
