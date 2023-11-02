import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  MusicPlayer: {station: Station};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type MusicPlayerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MusicPlayer"
>;

export type MusicPlayerScreenRouteProp = RouteProp<RootStackParamList, "MusicPlayer">;
