import { useContext } from "react";
import { RootStackParamList } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MusicPlayerServiceProvider } from "@/src/services";
import { RootState } from "@/src/store";
import { Image, TouchableOpacity, View } from "react-native";

import { Card, useTheme } from "react-native-paper";
import {
  State,
  usePlaybackState,
} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

function MusicPlayerPreview() {
  const playerService = useContext(MusicPlayerServiceProvider);

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);

  const playBackState = usePlaybackState();

  const handlePlayBtn = async () => {
    await playerService.togglePlayBack(playBackState);
  }

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
      <TouchableOpacity onPress={handlePlayBtn}>
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
