import { MusicPlayerAction } from "./musicPlayerActions";

interface MusicPlayerState {
  state: "playing" | "paused" | "stopped";
  currentStation?: {
    id: string,
    title: string;
    image: string;
    stream: string;
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
              id: action.station.id,
              title: action.station.title,
              image: action.station.image,
              stream: action.station.url,
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
