import { StackNavigatorRouterType } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, Image } from "react-native";
import { List } from "react-native-paper";

type StationListProps = {
  title: string;
  stations: Array<StationBase>;
  onEndReached: () => void;
};

function StationsList({ title, stations, onEndReached }: StationListProps) {
  const navigation = useNavigation<NavigationProp<StackNavigatorRouterType>>();

  function renderStation(station: StationBase) {
    return (
      <List.Item
        title={station.title}
        left={() => (
          <Image source={{ uri: station.image }} height={50} width={50} />
        )}
        onPress={() => navigation.navigate("MusicPlayer", { station })}
      />
    );
  }

  return (
    <List.Section>
      <List.Subheader style={{ fontSize: 20 }}>{title}</List.Subheader>
      <FlatList
        data={stations}
        keyExtractor={(item, index) => index + "_" + item.id}
        renderItem={({ item }) => renderStation(item)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </List.Section>
  );
}

export default StationsList;
