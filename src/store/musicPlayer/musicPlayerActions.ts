export type MusicPlayerAction =
  | { type: "PLAY"; station?: Station }
  | { type: "PAUSE" }
  | { type: "STOP" };

export const play = (station?: Station): MusicPlayerAction =>
  ({ type: "PLAY", station } as const);
export const pause = (): MusicPlayerAction => ({ type: "PAUSE" } as const);
export const stop = (): MusicPlayerAction => ({ type: "STOP" } as const);
