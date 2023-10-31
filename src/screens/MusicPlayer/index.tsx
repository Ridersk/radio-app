import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import podcasts from "../../../assets/data";
import { AppState } from "react-native";

function MusicPlayer() {
  const podcastsCount = podcasts.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();
  const [trackArtwork, setTrackArtwork] = useState<string>();

  const playBackState = usePlaybackState();

  const setupPlayer = async () => {
    try {
      const playerIsRunning = await TrackPlayer.isServiceRunning();
      console.log("Player running state:", playerIsRunning);
      if (!playerIsRunning){
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

      await TrackPlayer.add(podcasts);
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

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      if (track != undefined) {
        const { title, artwork, artist } = track;
        console.log(event.nextTrack);
        setTrackIndex(event.nextTrack);
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
      }
    }
  });

  const setTrackData = async () => {
    let trackIndex = (await TrackPlayer.getActiveTrackIndex()) || 0;
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(trackIndex);
    setTrackIndex(trackIndex);
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

  const nexttrack = async () => {
    if (trackIndex < podcastsCount - 1) {
      await TrackPlayer.skipToNext();
      setTrackData();
    }
  };

  const previoustrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      setTrackData();
    }
  };

  useEffect(() => {
    setupPlayer();

    return () => {
      stopPlayer();
    }
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
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>
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
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MusicPlayer;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainWrapper: {
    width: width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    alignSelf: "center",
    width: "90%",
    height: "90%",
    borderRadius: 15,
  },
  songText: {
    marginTop: 2,
    height: 70,
  },
  songContent: {
    textAlign: "center",
    color: "#EEEEEE",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  songArtist: {
    fontSize: 16,
    fontWeight: "300",
  },
  musicControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "60%",
  },
});
