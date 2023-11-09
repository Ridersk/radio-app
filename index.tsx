import { registerRootComponent } from "expo";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./src/store";
import { CombinedDarkTheme } from "./src/themes/dark";

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={CombinedDarkTheme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

registerRootComponent(Main);
TrackPlayer.registerPlaybackService(() =>
  require("./src/services/musicPlayer/backgroundTask")
);
