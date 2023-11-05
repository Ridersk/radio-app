import { RootStackParamList } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, Image } from "react-native";
import { List } from "react-native-paper";

type StationListProps = {
  stations: Array<Station>;
};

function StationsList({ stations }: StationListProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function renderStation(station: Station, index: number) {
    return (
      <List.Item
        key={index}
        title={station.title}
        left={() => (
          <Image source={{ uri: station.artwork }} height={50} width={50} />
        )}
        onPress={() => navigation.navigate("MusicPlayer", { station: station })}
      />
    );
  }

  return (
    <List.Section>
      <List.Subheader style={{ fontSize: 20 }}>Top Stations</List.Subheader>
      <FlatList
        data={stations}
        renderItem={({ item, index }) => renderStation(item, index)}
      />
    </List.Section>
  );
}

export default StationsList;
