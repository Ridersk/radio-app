import { FavoriteStationsAction } from "./favoriteStationsActions";

interface FavoriteStationsState {
  favoriteStations: StationBase[];
}

const initialState: FavoriteStationsState = {
  favoriteStations: [],
};

const favoriteStationsReducer = (
  state = initialState,
  action: FavoriteStationsAction
): FavoriteStationsState => {
  switch (action.type) {
    case "FILLUP":
      return {
        ...state,
        favoriteStations: action.stations,
      };
    case "ADD":
      if (state.favoriteStations.indexOf(action.station) == -1)
        return {
          ...state,
          favoriteStations: [...state.favoriteStations, action.station],
        };
      return state;
    case "REMOVE":
      const updatedFavorites = state.favoriteStations.filter(favorite => favorite.id != action.stationId);
      return {
        ...state,
        favoriteStations: updatedFavorites,
      };
    default:
      return state;
  }
};

export default favoriteStationsReducer;
