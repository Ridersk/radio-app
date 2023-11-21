import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";

import { musicPlayerActions } from "./src/store/musicPlayer";
import { CombinedDarkTheme } from "./src/themes/dark";
import StackNavigator from "./src/navigations/StackNavigator";

export default function App() {
  const dispatch = useDispatch();

  const handleStopState = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    dispatch(musicPlayerActions.stop());
  };

  useEffect(() => {
    return () => {
      handleStopState();
    };
  }, []);

  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
}
