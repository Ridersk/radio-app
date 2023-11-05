import { combineReducers, configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./musicPlayer/musicPlayerReducers";

const rootReducer = combineReducers({
  musicPlayer: musicPlayerReducer,
});

const store = configureStore({ reducer: rootReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
