import TrackPlayer, {
  Capability,
  PlaybackState,
  State,
} from "react-native-track-player";
import store from "@/src/store";
import { musicPlayerActions } from "@/src/store/musicPlayer";

export class MusicPlayerService {
  private static instance: MusicPlayerService;

  private constructor() {}

  public static getInstance(): MusicPlayerService {
    if (!MusicPlayerService.instance) {
      MusicPlayerService.instance = new MusicPlayerService();
    }
    return MusicPlayerService.instance;
  }

  async init() {
    const playerIsRunning = await TrackPlayer.isServiceRunning();
    console.log("Player running state:", playerIsRunning);
    if (!playerIsRunning) {
      await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
      await TrackPlayer.updateOptions({
        notificationCapabilities: [Capability.Play, Capability.Pause],
        capabilities: [Capability.Play, Capability.Pause],
      });
    }
  }

  async play(station: Station) {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      title: station.title,
      url: station.url,
      artwork: station.image,
      isLiveStream: true,
    });
    await TrackPlayer.play();
    store.dispatch(musicPlayerActions.play(station));
  }

  async resume() {
    const currentStation = store.getState().musicPlayer.currentStation;
    if (currentStation) this.play(currentStation);
  }

  async pause() {
    await TrackPlayer.pause();
    store.dispatch(musicPlayerActions.pause());
  }

  async togglePlayBack(
    state: PlaybackState | { state: undefined }
  ): Promise<State> {
    const currentStation = store.getState().musicPlayer.currentStation;
    if (currentStation) {
      if ([State.Paused, State.Stopped, State.Ready].includes(state.state!)) {
        await this.play(currentStation);
        return State.Playing;
      } else {
        await this.pause();
        return State.Paused;
      }
    }
    return State.Stopped;
  }
}
