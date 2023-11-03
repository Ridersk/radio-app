import React, { useEffect } from "react";
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
  Track,
  usePlaybackState,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MusicPlayerScreenNavigationProp, MusicPlayerScreenRouteProp } from "@/types/NavigationTypes";

import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/state/reducers";
import { musicPlayerActions } from "../../state/musicPlayer";

type MusicPlayerScreenProps = {
  navigation: MusicPlayerScreenNavigationProp;
  route: MusicPlayerScreenRouteProp;
};

function MusicPlayerScreen({ route }: MusicPlayerScreenProps) {
  const { station } = route.params;

  const dispatch = useDispatch();
  const currentStation = useSelector((state: RootState) => state.musicPlayer.currentStation);

  const playBackState = usePlaybackState();

  const handlePlayState = async () => {
    dispatch(musicPlayerActions.play({...station, artwork: Image.resolveAssetSource(station.artwork).uri}));
  };

  const handlePauseState = async () => {
    dispatch(musicPlayerActions.pause());
  };

  const getTrackDataFromPlaybackState = async (): Promise<Track | undefined> => {
    let trackIndex = (await TrackPlayer.getActiveTrackIndex()) || 0;
    return await TrackPlayer.getTrack(trackIndex);
  };

  const setupPlayer = async () => {
    try {
      const playerIsRunning = await TrackPlayer.isServiceRunning();
      console.log("Player running state:", playerIsRunning);
      if (!playerIsRunning) {
        await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
        await TrackPlayer.updateOptions({
          // stoppingAppPausesPlayback: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
      }

      if ((await getTrackDataFromPlaybackState())?.url != station.url){
        await TrackPlayer.reset();
        await TrackPlayer.add(station);
        await TrackPlayer.play();
      }
      
      await handlePlayState();
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlayBack = async (state: typeof playBackState) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    if (currentTrack != null) {
      if (state.state == State.Paused || state.state == State.Ready) {
        await TrackPlayer.play();
        await handlePlayState();
      } else {
        await TrackPlayer.pause();
        await handlePauseState();
      }
    }
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          {currentStation?.coverImageUri && (
            <Image source={{ uri: currentStation.coverImageUri }} style={styles.imageWrapper} />
          )}
        </View>
        <View style={styles.songText}>
          <Text
            style={[styles.songContent, styles.songTitle]}
            numberOfLines={3}
          >
            {currentStation?.name}
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
