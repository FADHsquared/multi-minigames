export interface TicTacToeTurnPayload {
  currentTurnIsO: boolean
  position: [number, number]
  toRoom: string
}

export interface LeaderboardJSON {
  data: {
    name: string
    points: number
  }[]
}
