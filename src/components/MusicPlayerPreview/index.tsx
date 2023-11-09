import { RootState } from "@/src/store";
import { musicPlayerActions } from "@/src/store/musicPlayer";
import { RootStackParamList } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";

import { Card, useTheme } from "react-native-paper";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

function MusicPlayerPreview() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);

  const playBackState = usePlaybackState();

  const handlePlayState = async () => {
    dispatch(musicPlayerActions.play());
  };

  const handlePauseState = async () => {
    dispatch(musicPlayerActions.pause());
  };

  const togglePlayBack = async (state: typeof playBackState) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    if (currentTrack) {
      if ([State.Paused, State.Stopped, State.Ready].includes(state.state!)) {
          await TrackPlayer.reset();
          await TrackPlayer.add(currentTrack);
          await TrackPlayer.play();
          await handlePlayState();
      } else {
        await TrackPlayer.stop();
        await handlePauseState();
      }
    }
  };

  function navigateToMusicPlayer() {
    console.log("Navigate to MusicPlayer");

    if (musicPlayerState.currentStation) {
      navigation.navigate("MusicPlayer", {
        station: {
          id: musicPlayerState.currentStation.id,
          title: musicPlayerState.currentStation.title,
          image: musicPlayerState.currentStation.image,
        },
      });
    }
  }

  function renderPlaybackBtn() {
    return (
      <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
        <Ionicons
          name={
            [State.Playing, State.Loading].includes(playBackState.state!)
              ? "pause-circle"
              : "play-circle"
          }
          size={40}
          color="#FFD369"
          style={{ marginHorizontal: 8 }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ backgroundColor: theme.colors.secondaryContainer }}>
      {["paused", "playing"].includes(musicPlayerState.state) && (
        <TouchableOpacity onPress={navigateToMusicPlayer}>
          <Card.Title
            title="Tocando agora"
            subtitle={musicPlayerState.currentStation?.title}
            left={() => (
              <Image
                source={{ uri: musicPlayerState.currentStation?.image }}
                height={50}
                width={50}
              />
            )}
            right={renderPlaybackBtn}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default MusicPlayerPreview;
