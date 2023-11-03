import { combineReducers } from "redux";
import musicPlayerReducer from "./musicPlayer/musicPlayerReducers";

const rootReducer = combineReducers({
  musicPlayer: musicPlayerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
