import { MusicPlayerAction } from "./musicPlayerActions";

interface MusicPlayerState {
  state: "playing" | "paused" | "stopped";
  currentStation?: {
    name: string;
    coverImageUri: string;
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
        currentStation: {
          name: action.station.title,
          coverImageUri: action.station.artwork,
        },
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
