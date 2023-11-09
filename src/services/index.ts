import { createContext } from "react";
import { MusicPlayerService } from "./musicPlayer";

export const MusicPlayerServiceProvider = createContext<MusicPlayerService>(
  MusicPlayerService.getInstance()
);
