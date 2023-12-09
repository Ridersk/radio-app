import { View } from "react-native";
import SearchInput from "./SearchInput";
import { searchStationsByText } from "@/src/api/radioApi";
import { Text } from "react-native-paper";
import { useState } from "react";
import StationsList from "@/src/components/StationsList";
import { SafeAreaView } from "react-native-safe-area-context";

function SearchStationsScreen() {
  const [searchText, setSearchText] = useState("");
  const [stations, setStations] = useState<StationBase[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearchStations = async (text: string) => {
    setSearchText(text);
    setLoading(true);
    if (text) {
      const newStations = await searchStationsByText(text);
      setStations(newStations);
    } else {
      setStations([]);
    }
    setLoading(false);
  };

  const handleGetMoreStations = async () => {
    const newStations = await searchStationsByText(searchText, page);
    setSearchText(searchText);
    setStations((prevStations) => [...prevStations, ...newStations]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchInput onSearch={handleSearchStations} style={{ width: "80%" }} />
      {searchText ? (
        <StationsList
          title={searchText}
          stations={stations}
          onEndReached={handleGetMoreStations}
          loading={loading}
        />
      ) : (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text>Featured Stations</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default SearchStationsScreen;
