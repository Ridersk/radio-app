import { FavoriteStationsServiceProvider } from "@/src/services/favoriteStationsService";
import { RootState } from "@/src/store";
import { StackNavigatorRouterType } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

type StationListProps = {
  title: string;
  stations: Array<StationBase>;
  onEndReached: () => void;
};

function StationsList({ title, stations, onEndReached }: StationListProps) {
  const navigation = useNavigation<NavigationProp<StackNavigatorRouterType>>();
  const favoriteService = useContext(FavoriteStationsServiceProvider);
  const favoritedStations = useSelector(
    (state: RootState) => state.favoriteStations.favoriteStations
  );
  const [favoritedIdsSet, setFavoritedIdsSet] = useState<Set<string>>();

  useEffect(() => {
    (async () => await favoriteService.getAll())();
  }, []);

  useEffect(() => {
    setFavoritedIdsSet(
      favoritedStations.reduce((acc, obj) => {
        acc.add(obj.id);
        return acc;
      }, new Set<string>())
    );
  }, [favoritedStations]);

  function renderFavBtn(station: StationBase) {
    return (
      <Icon
        name={favoritedIdsSet?.has(station.id) ? "heart" : "heart-o"}
        size={24}
        color={"white"}
        onPress={() => {}}
      />
    );
  }

  function renderStation(station: StationBase) {
    return (
      <List.Item
        title={station.title}
        left={() => (
          <Image source={{ uri: station.image }} height={50} width={50} />
        )}
        right={() => renderFavBtn(station)}
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
