import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import {
  MusicPlayerScreenNavigationProp,
  MusicPlayerScreenRouteProp,
} from "@/types/NavigationTypes";

import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { getStationStream } from "@/src/api/radioApi";
import { MusicPlayerServiceProvider } from "@/src/services";
import PlaybackButton from "@/src/components/PlaybackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { FavoriteStationsServiceProvider } from "@/src/services/favoriteStationsService";
import IconButton from "@/src/components/Icons/IconButton";

type MusicPlayerScreenProps = {
  navigation: MusicPlayerScreenNavigationProp;
  route: MusicPlayerScreenRouteProp;
};

function MusicPlayerScreen({ route }: MusicPlayerScreenProps) {
  const playerService = useContext(MusicPlayerServiceProvider);
  const favoriteService = useContext(FavoriteStationsServiceProvider);

  const { station } = route.params;
  const [stationFull, setStationFull] = useState<Station>();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const currentStation = useSelector(
    (state: RootState) => state.musicPlayer.currentStation
  );

  const setupPlayer = async () => {
    try {
      await playerService.init();

      try {
        if (stationFull && stationFull.id != currentStation?.id) {
          await playerService.play(stationFull);
        }
      } catch (error) {
        console.error("Error on start player:", error);
      }
    } catch (error) {
      console.error("Error on setup player:", error);
    }
  };

  function isStationFull(obj: StationBase): obj is Station {
    return (obj as Station).url !== undefined;
  }

  async function handleGetStationFull() {
    if (isStationFull(station)) {
      setStationFull(station);
      return;
    }

    const streamUrl = await getStationStream(station.id);
    setStationFull({ ...station, url: streamUrl });
    console.log("Station to StationFull:", station);
  }

  async function checkStationIsFavorite() {
    setIsFavorited(!!(await favoriteService.get(station.id)));
  }

  useEffect(() => {
    if (stationFull) {
      setupPlayer();
    }
  }, [stationFull]);

  useEffect(() => {
    checkStationIsFavorite();
    handleGetStationFull();
  }, []);

  const handleToggleFavorite = async () => {
    if (isFavorited) await favoriteService.remove(station.id);
    else if (station) await favoriteService.add(station);
    await checkStationIsFavorite();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          {currentStation?.image && (
            <Image
              source={{ uri: currentStation.image }}
              style={styles.imageWrapper}
            />
          )}
        </View>
        <View style={styles.songText}>
          <Text
            style={[styles.songContent, styles.songTitle]}
            numberOfLines={3}
          >
            {currentStation?.title}
          </Text>
        </View>
        <View
          style={{ ...styles.musicControlsContainer, flexDirection: "column" }}
        >
          <PlaybackButton size={72} style={{ position: "absolute" }} />
          <IconButton
            name={isFavorited ? "heart" : "heart-o"}
            size={32}
            color={"#FFD369"}
            style={{ position: "absolute", alignSelf: "flex-end" }}
            onPress={handleToggleFavorite}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MusicPlayerScreen;
