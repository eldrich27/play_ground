function calculateTax(subtotal: number, taxRate = 0.07): number {
  return subtotal * (1 + taxRate);
}

// Arrow function with optional parameter (?)
const greet = (name: string, title?: string): string => {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
};

// Void vs Never
function logMessage(msg: string): void {
  console.log(msg); // returns undefined
}

function throwFatal(err: string): never {
  throw new Error(err); // never finishes or returns
}