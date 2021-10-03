import { get2DArrayOf, randomNumberFromZeroToMax } from './helper'

type Point2D = [x: number, y: number]
type PlayArea = (null | 'food' | 'snake')[][]

class SnakeGame {
  private playArea: PlayArea
  private snakeLocations: Point2D[]
  private foodLocation: Point2D
  private continuousMoveIntervalID: number | undefined
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
    let randomX: number, randomY: number
    do {
      randomX = randomNumberFromZeroToMax(this.playAreaSize - 1)
      randomY = randomNumberFromZeroToMax(this.playAreaSize - 1)
    } while (
      this.snakeLocations.some(([x, y]) => x === randomX && y === randomY)
    )

    return [randomX, randomY]
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

    if (this.snakeLocations.some(([x, y]) => x === nextX && y === nextY)) {
      this.isLost = true
      clearInterval(this.continuousMoveIntervalID)
      return
    }

    if (nextX === prevFoodX && nextY === prevFoodY) willRequireNewFood = true
    else this.snakeLocations.shift()
    this.snakeLocations.push([nextX, nextY])

    this.updatePlayArea(willRequireNewFood)
  }

  getPlayArea(): PlayArea {
    return this.playArea
  }

  getIsLost(): boolean {
    return this.isLost
  }

  performContinuousMove(
    to: 'left' | 'right' | 'up' | 'down',
    onIntervalTick: () => void
  ): void {
    if (!this.isLost) {
      clearInterval(this.continuousMoveIntervalID)

      let offsetX = 0
      let offsetY = 0
      switch (to) {
        case 'left':
          offsetX = -1
          break
        case 'right':
          offsetX = 1
          break
        case 'up':
          offsetY = -1
          break
        case 'down':
          offsetY = 1
          break
      }

      this.continuousMoveIntervalID = setInterval(() => {
        this.walkSnakeBy(offsetX, offsetY)
        onIntervalTick()
      }, this.snakeMovingInterval)
    }
  }

  resetPlayArea(): void {
    this.playArea = get2DArrayOf(this.playAreaSize, this.playAreaSize, null)
    this.snakeLocations = [[1, Math.round((this.playAreaSize - 1) / 2)]]
    this.updatePlayArea(true)
    this.isLost = false
  }

  close(): void {
    clearInterval(this.continuousMoveIntervalID)
  }
}

export default SnakeGame
