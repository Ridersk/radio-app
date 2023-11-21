import { MusicPlayerServiceProvider } from "@/src/services";
import { useContext } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { State, usePlaybackState } from "react-native-track-player";
import Icon from "react-native-vector-icons/FontAwesome";

type PlaybackButtonProps = {
  size: number;
  style?: ViewStyle;
};

function PlaybackButton({ size, style }: PlaybackButtonProps) {
  const playerService = useContext(MusicPlayerServiceProvider);
  const playBackState = usePlaybackState();
  const color = "#FFD369";

  const handlePlayBtn = async () => {
    await playerService.togglePlayBack(playBackState);
  };

  const isLoading = () => {
    return [State.Buffering, State.Loading].includes(playBackState.state!);
  };

  const isPlaying = () => {
    return playBackState.state === State.Playing;
  };

  const renderIcon = () => {
    if (isLoading()) {
      return (
        <View style={{ width: size, height: size }}>
          <ActivityIndicator animating={true} size={size * 0.8} color={color} />
        </View>
      );
    }

    return (
      <Icon
        name={isPlaying() ? "pause-circle" : "play-circle"}
        size={size}
        color={color}
      />
    );
  };

  return (
    <TouchableOpacity
      style={style}
      onPress={handlePlayBtn}
      disabled={isLoading()}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

export default PlaybackButton;
