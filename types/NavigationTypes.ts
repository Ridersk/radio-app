import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  MusicPlayer: {station: StationBase};
  Stations: {category: StationCategory}
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

export type StationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Stations"
>;
export type StationsScreenRouteProp = RouteProp<RootStackParamList, "Stations">;
