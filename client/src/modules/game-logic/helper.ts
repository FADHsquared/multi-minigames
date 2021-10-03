export function get2DArrayOf<Type>(
  row: number,
  column: number,
  of: Type
): Type[][] {
  return Array.from({ length: row }, () => new Array(column).fill(of))
}

export function randomNumberFromZeroToMax(max: number): number {
  return Math.round(Math.random() * max)
}
