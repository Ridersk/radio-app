import MusicPlayerScreen from "./src/screens/MusicPlayer";
import HomeScreen from "./src/screens/Home";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { createRef, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

import { RootStackParamList } from "./types/NavigationTypes";
import MusicPlayerPreview from "./src/components/MusicPlayerPreview";
import { musicPlayerActions } from "./src/store/musicPlayer";
import StationsScreen from "./src/screens/Stations";
import { CombinedDarkTheme } from "./src/themes/dark";

const Stack = createStackNavigator<RootStackParamList>();

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

  const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const [showMusicPreview, setShowMusicPreview] = useState<boolean>(false);

  useEffect(() => {
    const allowedRoutes = ["Home", "Stations"]
    setShowMusicPreview(allowedRoutes.includes(currentRoute!));
  }, [currentRoute]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={CombinedDarkTheme}
      onReady={() =>
        setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name)
      }
      onStateChange={() => {
        setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name);
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
        <Stack.Screen name="Stations" component={StationsScreen} />
      </Stack.Navigator>
      {showMusicPreview && <MusicPlayerPreview />}
    </NavigationContainer>
  );
}
