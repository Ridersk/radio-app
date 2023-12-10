import SearchStationsScreen from "@/src/screens/SearchStations";
import { TabNavigatorRouterType } from "@/types/NavigationTypes";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MusicPlayerPreview from "../components/MusicPlayerPreview";
import HomeScreen from "../screens/Home";
import FavoriteStationsScreen from "../screens/FavoriteStations";

const Tab = createBottomTabNavigator<TabNavigatorRouterType>();

function BottomBarNavigator() {
  const renderBottomBar = ({
    navigation,
    state,
    descriptors,
    insets,
  }: BottomTabBarProps) => (
    <>
      <MusicPlayerPreview />
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel.toString()
              : options.title !== undefined
              ? options.title
              : route.name;
          return label;
        }}
      />
    </>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
      }}
      tabBar={renderBottomBar}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="SearchStations"
        component={SearchStationsScreen}
        options={{
          title: "Search Stations",
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="search" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="FavoriteStations"
        component={FavoriteStationsScreen}
        options={{
          title: "Favorite Stations",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="heart" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBarNavigator;
