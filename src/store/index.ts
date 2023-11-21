import { combineReducers, configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./musicPlayer/musicPlayerReducers";
import favoriteStationsReducer from "./favoriteStations/favoriteStationsReducers";

const rootReducer = combineReducers({
  musicPlayer: musicPlayerReducer,
  favoriteStations: favoriteStationsReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default store;
