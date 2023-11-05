import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native";

import stations from "@/assets/data";
import { List } from "react-native-paper";
import { HomeScreenNavigationProp } from "@/types/NavigationTypes";

import styles from "./styles";

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({ navigation }: HomeScreenProps) {
  function renderStation(station: Station, index: number) {
    return (
      <List.Item
        key={index}
        title={station.title}
        left={() => (
          <Image
            source={{ uri: station.artwork }}
            height={50}
            width={50}
          />
        )}
        onPress={() => navigation.navigate("MusicPlayer", { station: station })}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <List.Section>
        <List.Subheader style={{ fontSize: 20 }}>Top Stations</List.Subheader>
        <FlatList
          data={stations}
          renderItem={({ item, index }) => renderStation(item, index)}
        />
      </List.Section>
    </SafeAreaView>
  );
}

export default HomeScreen;
