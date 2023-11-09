import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  State,
  usePlaybackState,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  MusicPlayerScreenNavigationProp,
  MusicPlayerScreenRouteProp,
} from "@/types/NavigationTypes";

import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { getStationStream } from "@/src/api/radioApi";
import { MusicPlayerServiceProvider } from "@/src/services";

type MusicPlayerScreenProps = {
  navigation: MusicPlayerScreenNavigationProp;
  route: MusicPlayerScreenRouteProp;
};



function MusicPlayerScreen({ route }: MusicPlayerScreenProps) {
  const playerService = useContext(MusicPlayerServiceProvider);
  
  const { station } = route.params;
  const [stationFull, setStationFull] = useState<Station>();

  const currentStation = useSelector(
    (state: RootState) => state.musicPlayer.currentStation
  );

  const playBackState = usePlaybackState();

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

  const handlePlayBtn = async () => {
    await playerService.togglePlayBack(playBackState);
  }

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

  useEffect(() => {
    if (stationFull) {
      setupPlayer();
    }
  }, [stationFull]);

  useEffect(() => {
    handleGetStationFull();
  }, []);

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
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity
            onPress={handlePlayBtn}
            disabled={playBackState.state === State.Loading}
          >
            <Ionicons
              name={
                [State.Playing, State.Buffering, State.Loading].includes(
                  playBackState.state!
                )
                  ? "pause-circle"
                  : "play-circle"
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MusicPlayerScreen;
