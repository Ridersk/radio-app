import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  MusicPlayerScreenNavigationProp,
  MusicPlayerScreenRouteProp,
} from "@/types/NavigationTypes";

import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { musicPlayerActions } from "@/src/store/musicPlayer";
import { getStationStream } from "@/src/api/radioApi";

type MusicPlayerScreenProps = {
  navigation: MusicPlayerScreenNavigationProp;
  route: MusicPlayerScreenRouteProp;
};

function MusicPlayerScreen({ route }: MusicPlayerScreenProps) {
  const { station } = route.params;
  const [stationFull, setStationFull] = useState<Station>();

  const dispatch = useDispatch();
  const currentStation = useSelector(
    (state: RootState) => state.musicPlayer.currentStation
  );

  const playBackState = usePlaybackState();

  const handlePlayState = async () => {
    console.log("Handle Play - Station Full:", stationFull);
    dispatch(musicPlayerActions.play(stationFull));
  };

  const handlePauseState = async () => {
    dispatch(musicPlayerActions.pause());
  };

  const setupPlayer = async () => {
    try {
      const playerIsRunning = await TrackPlayer.isServiceRunning();
      console.log("Player running state:", playerIsRunning);
      if (!playerIsRunning) {
        await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
      }

      try {
        if (stationFull && stationFull.id != currentStation?.id) {
          await TrackPlayer.reset();
          await TrackPlayer.add({
            title: stationFull.title,
            url: stationFull.url,
            artwork: stationFull.image,
            isLiveStream: true,
          });
          await TrackPlayer.play();
          await handlePlayState();
        }
      } catch (error) {
        console.error("Error on start player:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlayBack = async (state: typeof playBackState) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    if (currentTrack) {
      if ([State.Paused, State.Stopped, State.Ready].includes(state.state!)) {
        if (stationFull) {
          await TrackPlayer.reset();
          await TrackPlayer.add(currentTrack);
          await TrackPlayer.play();
          await handlePlayState();
        }
      } else {
        await TrackPlayer.stop();
        await handlePauseState();
      }
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
            onPress={() => togglePlayBack(playBackState)}
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
