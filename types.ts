export interface TicTacToeTurnPayload {
  turnOf: "x" | "o";
  position: [number, number];
}
