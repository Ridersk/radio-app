import { registerRootComponent } from "expo";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { PaperProvider } from "react-native-paper";


export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

registerRootComponent(Main);
TrackPlayer.registerPlaybackService(() => require("./service"));
