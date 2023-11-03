import { registerRootComponent } from "expo";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./src/state/store";

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}

registerRootComponent(Main);
TrackPlayer.registerPlaybackService(() =>
  require("./src/services/musicPlayer")
);
