import store from "@/src/store";
import { IDatabase } from "@/src/database";
import { FavoriteStationModel } from "@/src/database/models/favoriteStation";
import { favoriteStationsActions } from "@/src/store/favoriteStations";

export default class FavoriteStationsService {
  private static instance: FavoriteStationsService;

  private repository: IDatabase<FavoriteStationModel>;

  private constructor(repository: IDatabase<FavoriteStationModel>) {
    this.repository = repository;
  }

  public static getInstance(
    repository: IDatabase<FavoriteStationModel>
  ): FavoriteStationsService {
    if (!FavoriteStationsService.instance) {
      FavoriteStationsService.instance = new FavoriteStationsService(
        repository
      );
    }
    return FavoriteStationsService.instance;
  }

  public async get(id: string): Promise<StationBase | null> {
    try {
      const favorite = await this.repository.get(id);
      return {
        id: favorite.stationId,
        title: favorite.title,
        image: favorite.image,
      }
    } catch {
      return null;
    }
  }

  public async getAll(): Promise<StationBase[]> {
    const favorites = await this.repository.getAll();
    const stations = favorites.map(
      (favorite): StationBase => ({
        id: favorite.stationId,
        title: favorite.title,
        image: favorite.image,
      }),
      favorites
      );
    store.dispatch(favoriteStationsActions.fillup(stations));
    return stations;
  }

  public async add(station: StationBase): Promise<StationBase> {
    const favorite = await this.repository.create({
      _id: station.id,
      stationId: station.id,
      image: station.image,
      title: station.title,
    });
    store.dispatch(favoriteStationsActions.add(station));
    return {
      id: favorite.stationId,
      title: favorite.title,
      image: favorite.image,
    };
  }

  public async remove(stationId: string) {
    await this.repository.delete(stationId);
    store.dispatch(favoriteStationsActions.remove(stationId));
  }
}
