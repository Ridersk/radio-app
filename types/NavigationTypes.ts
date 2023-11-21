import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type TabNavigatorRouterType = {
  Home: undefined;
  SearchStations: undefined;
  FavoriteStations: undefined;
};

export type StackNavigatorRouterType = {
  BottomTabStack: undefined;
  MusicPlayer: { station: StationBase };
  Stations: { category: StationCategory };
};

export type MusicPlayerScreenNavigationProp = StackNavigationProp<
  StackNavigatorRouterType,
  "MusicPlayer"
>;
export type MusicPlayerScreenRouteProp = RouteProp<
  StackNavigatorRouterType,
  "MusicPlayer"
>;

export type StationsScreenNavigationProp = StackNavigationProp<
  StackNavigatorRouterType,
  "Stations"
>;
export type StationsScreenRouteProp = RouteProp<
  StackNavigatorRouterType,
  "Stations"
>;
