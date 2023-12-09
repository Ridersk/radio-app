import StationsList from "@/src/components/StationsList";
import { FavoriteStationsServiceProvider } from "@/src/services/favoriteStationsService";
import { RootState } from "@/src/store";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

function FavoriteStationsScreen() {
  const favoriteService = useContext(FavoriteStationsServiceProvider);
  const favoritedStations = useSelector(
    (state: RootState) => state.favoriteStations.favoriteStations
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveFavorites();
  }, []);

  const retrieveFavorites = async () => {
    setLoading(true);
    await favoriteService.getAll();
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StationsList
        title={"Favorites"}
        stations={favoritedStations}
        loading={loading}
      />
    </SafeAreaView>
  );
}

export default FavoriteStationsScreen;
