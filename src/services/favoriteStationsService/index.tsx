import { createContext } from "react";
import FavoriteStationsService from "./service";
import { schema } from "@/src/database/realm/repositories/favoriteStation";

export const FavoriteStationsServiceProvider =
  createContext<FavoriteStationsService>(
    FavoriteStationsService.getInstance(schema)
  );
