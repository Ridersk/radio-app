import {BaseModel} from "./@base";

export class FavoriteStationModel extends BaseModel {
  _id: string;
  stationId: string;
  title: string;
  image: string;

  constructor(
    _id: string,
    stationId: string,
    title: string,
    image: string
  ) {
    super(_id);
    this._id = _id;
    this.stationId = stationId;
    this.title = title;
    this.image = image;
  }

  static from(data: any) {
    return new FavoriteStationModel(
      data._id,
      data.stationId,
      data.title,
      data.image,
    );
  }
}
