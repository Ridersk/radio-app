import { MusicPlayerAction } from "./musicPlayerActions";

interface MusicPlayerState {
  state: "playing" | "paused" | "stopped";
  currentStation?: Station;
}

const initialState: MusicPlayerState = {
  state: "stopped",
};

const musicPlayerReducer = (
  state = initialState,
  action: MusicPlayerAction
): MusicPlayerState => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        state: "playing",
        currentStation: action.station
          ? action.station
          : state.currentStation,
      };
    case "PAUSE":
      return { ...state, state: "paused" };
    case "STOP":
      return { ...state, state: "stopped", currentStation: undefined };
    default:
      return state;
  }
};

export default musicPlayerReducer;
