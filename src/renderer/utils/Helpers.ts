export function isEven(n: number): boolean {
  return n % 2 == 0;
}

export function isOdd(n: number): boolean {
  return Math.abs(n % 2) == 1;
}
