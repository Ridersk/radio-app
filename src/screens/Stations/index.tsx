import { getStationsByCategory } from "@/src/api/radioApi";
import StationsList from "@/src/components/StationsList";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StationsScreenRouteProp } from "@/types/NavigationTypes";

type StationsScreenProps = {
  route: StationsScreenRouteProp;
};

function StationsScreen({ route }: StationsScreenProps) {
  const { category } = route.params;
  const [stations, setStations] = useState<StationBase[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    retrieveStations();
  }, []);

  const handleGetStations = async () => {
    const newStations = await getStationsByCategory(category.id, page);
    setStations(prevStations => [...prevStations, ...newStations]);
    setPage(prevPage => prevPage + 1);
  };

  async function retrieveStations() {
    setLoading(true);
    await handleGetStations();
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {stations && (
        <StationsList
          title={category.title}
          stations={stations}
          onEndReached={handleGetStations}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
}

export default StationsScreen;
