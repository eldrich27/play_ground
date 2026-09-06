// Explicit type annotations
let id: number = 42;
let username: string = "alex_dev";
let isActive: boolean = true;

// Type inference (TypeScript knows these types automatically)
let score = 100;           // inferred as number
let role = "admin";        // inferred as string
console.log(typeof score);  // "number"
console.log(typeof role);   // "string"

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuples: Fixed length and specific types per position
let userTuple: [number, string] = [1, "Admin"];