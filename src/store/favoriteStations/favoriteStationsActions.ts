export type FavoriteStationsAction =
  | { type: "FILLUP"; stations: Station[] }
  | { type: "ADD"; station: Station }
  | { type: "REMOVE"; stationId: string };

export const fillup = (stations: Station[]): FavoriteStationsAction => ({
  type: "FILLUP",
  stations,
});
export const add = (station: Station): FavoriteStationsAction => ({
  type: "ADD",
  station,
});
export const remove = (stationId: string): FavoriteStationsAction => ({
  type: "REMOVE",
  stationId,
});
