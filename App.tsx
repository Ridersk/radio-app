import MusicPlayerScreen from "./src/screens/MusicPlayer";
import HomeScreen from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";

import { musicPlayerActions } from "./src/state/musicPlayer";
import { RootStackParamList } from "./types/NavigationTypes";

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
