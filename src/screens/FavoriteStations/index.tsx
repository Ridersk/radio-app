import StationsList from "@/src/components/StationsList";
import { FavoriteStationsServiceProvider } from "@/src/services/favoriteStationsService";
import { RootState } from "@/src/store";
import { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

function FavoriteStationsScreen() {
  const favoriteService = useContext(FavoriteStationsServiceProvider);
  const favoritedStations = useSelector(
    (state: RootState) => state.favoriteStations.favoriteStations
  );

  useEffect(() => {
    retrieveFavorites();
  }, []);

  const retrieveFavorites = async () => {
    await favoriteService.getAll();
  };

  return (
    <SafeAreaView>
      <StationsList
        title={"Favorites"}
        stations={favoritedStations}
        onEndReached={() => {}}
      />
    </SafeAreaView>
  );
}

export default FavoriteStationsScreen;
