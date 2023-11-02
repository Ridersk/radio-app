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
import { MusicPlayerScreenRouteProp } from "@/types/NavigationTypes";

import styles from "./styles";

type MusicPlayerScreenProps = {
  route: MusicPlayerScreenRouteProp;
};

function MusicPlayerScreen({ route }: MusicPlayerScreenProps) {
  const { station } = route.params;

  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();
  const [trackArtwork, setTrackArtwork] = useState<string>();

  const playBackState = usePlaybackState();

  const setupPlayer = async () => {
    try {
      const playerIsRunning = await TrackPlayer.isServiceRunning();
      console.log("Player running state:", playerIsRunning);
      if (!playerIsRunning) {
        await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
        await TrackPlayer.updateOptions({
          stoppingAppPausesPlayback: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
      }

      await TrackPlayer.add(station);
      await setTrackData();
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const stopPlayer = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
  };

  const setTrackData = async () => {
    let trackIndex = (await TrackPlayer.getActiveTrackIndex()) || 0;
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    setTrackTitle(trackObject?.title);
    setTrackArtist(trackObject?.artist);
    setTrackArtwork(trackObject?.artwork);
  };

  const togglePlayBack = async (state: typeof playBackState) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    if (currentTrack != null) {
      if (state.state == State.Paused || state.state == State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  useEffect(() => {
    setupPlayer();

    return () => {
      stopPlayer();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          {trackArtwork && (
            <Image source={{ uri: trackArtwork }} style={styles.imageWrapper} />
          )}
        </View>
        <View style={styles.songText}>
          <Text
            style={[styles.songContent, styles.songTitle]}
            numberOfLines={3}
          >
            {trackTitle}
          </Text>
          <Text
            style={[styles.songContent, styles.songArtist]}
            numberOfLines={2}
          >
            {trackArtist}
          </Text>
        </View>
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity
            onPress={() => togglePlayBack(playBackState)}
            disabled={playBackState.state === State.Loading}
          >
            <Ionicons
              name={
                [State.Playing, State.Loading].includes(playBackState.state!)
                  ? "ios-pause-circle"
                  : "ios-play-circle"
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
