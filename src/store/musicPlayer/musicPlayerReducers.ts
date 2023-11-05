import { MusicPlayerAction } from "./musicPlayerActions";

interface MusicPlayerState {
  state: "playing" | "paused" | "stopped";
  currentStation?: {
    name: string;
    coverUri: string;
    streamUri: string;
  };
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
          ? {
              name: action.station.title,
              coverUri: action.station.artwork,
              streamUri: action.station.url,
            }
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
