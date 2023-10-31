import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MusicPlayer from "./src/screens/MusicPlayer";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
