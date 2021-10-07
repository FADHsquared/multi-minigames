import { get2DArrayOf, random2DPointInArea } from './helper'
import type { Point2D } from './game-logic'

type PlayArea = (null | 'food' | 'snake')[][]

class SnakeGame {
  private readonly moveOffsetPairs: { [move: string]: Point2D } = {
    left: [-1, 0],
    right: [1, 0],
    up: [0, -1],
    down: [0, 1]
  }

  private playArea: PlayArea
  private snakeLocations: Point2D[]
  private foodLocation: Point2D
  private continuousMoveIntervalID: number | undefined
  private onUpdateEventsCB: (() => void) | undefined
  private isLost = false

  constructor(
    private readonly playAreaSize: number,
    private readonly snakeMovingInterval: number = 200
  ) {
    this.playArea = get2DArrayOf(playAreaSize, playAreaSize, null)
    this.snakeLocations = [[1, Math.round((playAreaSize - 1) / 2)]]
    this.foodLocation = this.getRandomFoodPoint()
    this.updatePlayArea(false)
  }

  private getRandomFoodPoint(): Point2D {
    return random2DPointInArea(
      this.playAreaSize,
      this.playAreaSize,
      this.snakeLocations
    )
  }

  private updatePlayArea(isRequiringNewFood: boolean) {
    this.playArea = get2DArrayOf(this.playAreaSize, this.playAreaSize, null)
    this.snakeLocations.forEach(([x, y]) => {
      this.playArea[y][x] = 'snake'
    })

    if (isRequiringNewFood) this.foodLocation = this.getRandomFoodPoint()
    const [foodX, foodY] = this.foodLocation
    this.playArea[foodY][foodX] = 'food'
  }

  private walkSnakeBy(offsetX: number, offsetY: number) {
    const [prevX, prevY] = this.snakeLocations[this.snakeLocations.length - 1]
    const [prevFoodX, prevFoodY] = this.foodLocation
    let willRequireNewFood = false

    const nextX = prevX + offsetX
    const nextY = prevY + offsetY
    console.log(nextX)

    if (
      this.snakeLocations.some(([x, y]) => x === nextX && y === nextY) ||
      nextX === -1 ||
      nextX === this.playAreaSize ||
      nextY === -1 ||
      nextY === this.playAreaSize
    ) {
      this.isLost = true
      clearInterval(this.continuousMoveIntervalID)
      return
    }

    if (nextX === prevFoodX && nextY === prevFoodY) willRequireNewFood = true
    else this.snakeLocations.shift()
    this.snakeLocations.push([nextX, nextY])

    this.updatePlayArea(willRequireNewFood)
  }

  onUpdateEvents(cb: () => void): void {
    this.onUpdateEventsCB = cb
    this.onUpdateEventsCB?.()
  }

  getPlayArea(): PlayArea {
    return this.playArea
  }

  getIsLost(): boolean {
    return this.isLost
  }

  performContinuousMove(to: 'left' | 'right' | 'up' | 'down'): void {
    if (!this.isLost) {
      clearInterval(this.continuousMoveIntervalID)

      this.continuousMoveIntervalID = setInterval(() => {
        this.walkSnakeBy(...this.moveOffsetPairs[to])
        this.onUpdateEventsCB?.()
      }, this.snakeMovingInterval)
    }
  }

  resetPlayArea(): void {
    this.playArea = get2DArrayOf(this.playAreaSize, this.playAreaSize, null)
    this.snakeLocations = [[1, Math.round((this.playAreaSize - 1) / 2)]]
    this.updatePlayArea(true)
    this.isLost = false

    this.onUpdateEventsCB?.()
  }

  close(): void {
    clearInterval(this.continuousMoveIntervalID)
  }
}

export default SnakeGame
export type { PlayArea }
