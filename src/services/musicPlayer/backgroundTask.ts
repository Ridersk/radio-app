import TrackPlayer, { Event } from "react-native-track-player";
import { MusicPlayerService } from ".";

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => MusicPlayerService.getInstance().resume());
  TrackPlayer.addEventListener(Event.RemotePause, () => MusicPlayerService.getInstance().pause());
};
