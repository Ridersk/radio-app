import { StackNavigatorRouterType } from "@/types/NavigationTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootState } from "@/src/store";
import { Image, TouchableOpacity, View } from "react-native";

import { Card, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import PlaybackButton from "../PlaybackButton";

function MusicPlayerPreview() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<StackNavigatorRouterType>>();
  const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);

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
      <View style={{ marginHorizontal: 16 }}>
        <PlaybackButton size={40} />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: theme.colors.secondaryContainer }}>
      {["paused", "playing"].includes(musicPlayerState.state) && (
        <TouchableOpacity onPress={navigateToMusicPlayer}>
          <Card.Title
            title="Playing now"
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
