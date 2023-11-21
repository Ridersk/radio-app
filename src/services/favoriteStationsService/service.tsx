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

  public async get(id: string): Promise<Station | null> {
    try {
      const favorite = await this.repository.get(id);
      return {
        id: favorite.stationId,
        title: favorite.title,
        image: favorite.image,
        url: favorite.url,
      }
    } catch {
      return null;
    }
  }

  public async getAll(): Promise<Station[]> {
    const favorites = await this.repository.getAll();
    const stations = favorites.map(
      (favorite): Station => ({
        id: favorite.stationId,
        title: favorite.title,
        image: favorite.image,
        url: favorite.url,
      }),
      favorites
      );
    store.dispatch(favoriteStationsActions.fillup(stations));
    return stations;
  }

  public async add(station: Station): Promise<Station> {
    const favorite = await this.repository.create({
      _id: station.id,
      stationId: station.id,
      image: station.image,
      title: station.title,
      url: station.url,
    });
    store.dispatch(favoriteStationsActions.add(station));
    return {
      id: favorite.stationId,
      title: favorite.title,
      image: favorite.image,
      url: favorite.url,
    };
  }

  public async remove(stationId: string) {
    await this.repository.delete(stationId);
    store.dispatch(favoriteStationsActions.remove(stationId));
  }
}
