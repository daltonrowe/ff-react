export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.max(min, Math.random() * max));
}
