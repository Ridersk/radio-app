export type FavoriteStationsAction =
  | { type: "FILLUP"; stations: StationBase[] }
  | { type: "ADD"; station: StationBase }
  | { type: "REMOVE"; stationId: string };

export const fillup = (stations: StationBase[]): FavoriteStationsAction => ({
  type: "FILLUP",
  stations,
});
export const add = (station: StationBase): FavoriteStationsAction => ({
  type: "ADD",
  station,
});
export const remove = (stationId: string): FavoriteStationsAction => ({
  type: "REMOVE",
  stationId,
});
