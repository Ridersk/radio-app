import Realm from "realm";
import { RealmDatabase } from "..";
import { FavoriteStationModel } from "../../models/favoriteStation";

export class FavoriteStationObject extends Realm.Object<FavoriteStationModel> {
  static schema = {
    name: "FavoriteStationObject",
    primaryKey: "_id",
    properties: {
      _id: { type: "string", indexed: true },
      stationId: "string",
      title: "string",
      image: "string",
      url: "string",
    },
  };
}

export default () => {
  return new RealmDatabase<FavoriteStationModel>(FavoriteStationObject, FavoriteStationModel);
}
