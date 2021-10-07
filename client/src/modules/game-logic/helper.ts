import type { Point2D } from './game-logic'

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

export function random2DPointInArea(
  areaWidth: number,
  areaHeight: number,
  exclusion2DPoints: Point2D[]
): Point2D {
  let randomX: number, randomY: number
  do {
    randomX = randomNumberFromZeroToMax(areaWidth - 1)
    randomY = randomNumberFromZeroToMax(areaHeight - 1)
  } while (exclusion2DPoints.some(([x, y]) => x === randomX && y === randomY))

  return [randomX, randomY]
}
