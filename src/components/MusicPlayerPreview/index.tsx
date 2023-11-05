import { RootState } from "@/src/store";
import { musicPlayerActions } from "@/src/store/musicPlayer";
import { RootStackParamList } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";

import { Card } from "react-native-paper";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

function MusicPlayerPreview() {
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

  function navigateToMusicPlayer() {
    console.log("Navigate to MusicPlayer");

    if (musicPlayerState.currentStation) {
      navigation.navigate("MusicPlayer", {
        station: {
          title: musicPlayerState.currentStation?.title,
          image: musicPlayerState.currentStation?.image,
          url: musicPlayerState.currentStation?.stream,
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
    <View>
      {["paused", "playing"].includes(musicPlayerState.state) && (
        <TouchableOpacity onPress={navigateToMusicPlayer}>
          <Card.Title
            title={musicPlayerState.currentStation?.title}
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
