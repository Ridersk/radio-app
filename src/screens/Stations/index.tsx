import { getStationsByCategory } from "@/src/api/radioApi";
import StationsList from "@/src/components/StationsList";
import { StationsScreenRouteProp } from "@/types/NavigationTypes";
import { useEffect, useState } from "react";
import { View } from "react-native";

type StationsScreenProps = {
  route: StationsScreenRouteProp;
};

function StationsScreen({ route }: StationsScreenProps) {
  const { category } = route.params;
  const [stations, setStations] = useState<StationBase[]>([]);
  const [page, setPage] = useState(0);

  async function handleGetStations() {
    const stations = await getStationsByCategory(category.id, page);
    setStations(prevStations => [...prevStations, ...stations]);
    setPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    handleGetStations();
  }, []);

  return (
    <View>
      {stations && (
        <StationsList
          title={category.title}
          stations={stations}
          onEndReached={handleGetStations}
        />
      )}
    </View>
  );
}

export default StationsScreen;
