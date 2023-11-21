import { createContext } from "react";
import FavoriteStationsService from "./service";
import FavoriteStationRepository from "@/src/database/realm/repositories/favoriteStation";

export const FavoriteStationsServiceProvider =
  createContext<FavoriteStationsService>(
    FavoriteStationsService.getInstance(FavoriteStationRepository())
  );
