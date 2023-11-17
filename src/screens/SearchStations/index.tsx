import { View } from "react-native";
import SearchInput from "./SearchInput";
import { searchStationsByText } from "@/src/api/radioApi";
import { Text } from 'react-native-paper';
import { useState } from "react";
import StationsList from "@/src/components/StationsList";

function SearchStationsScreen() {
  const [searchText, setSearchText] = useState("");
  const [stations, setStations] = useState<StationBase[]>([]);
  const [page, setPage] = useState(0);

  const handleSearchStations = async (text: string) => {
    if (!text) return;

    const newStations = await searchStationsByText(text);
    setSearchText(text);
    setStations(newStations);
  };

  const handleGetMoreStations = async () => {
    const newStations = await searchStationsByText(searchText, page);
    setSearchText(searchText);
    setStations((prevStations) => [...prevStations, ...newStations]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View>
      <SearchInput onSearch={handleSearchStations} />
      {stations && stations.length > 0 ? (
        <StationsList
          title={searchText}
          stations={stations}
          onEndReached={handleGetMoreStations}
        />
      ) : (
        <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <Text>Featured Stations</Text>
        </View>
      )}
    </View>
  );
}

export default SearchStationsScreen;
