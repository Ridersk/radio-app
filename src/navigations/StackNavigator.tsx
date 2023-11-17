import { StackNavigatorRouterType } from "@/types/NavigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import MusicPlayerScreen from "../screens/MusicPlayer";
import StationsScreen from "../screens/Stations";
import BottomBarNavigator from "./BottomBarNavigator";

const Stack = createStackNavigator<StackNavigatorRouterType>();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabStack" component={BottomBarNavigator} />
      <Stack.Screen name="Stations" component={StationsScreen} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
