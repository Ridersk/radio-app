import {BaseModel} from "./@base";

export class FavoriteStationModel extends BaseModel {
  _id: string;
  stationId: string;
  title: string;
  image: string;
  url: string;

  constructor(
    _id: string,
    stationId: string,
    title: string,
    image: string,
    url: string
  ) {
    super(_id);
    this._id = _id;
    this.stationId = stationId;
    this.title = title;
    this.image = image;
    this.url = url;
  }

  static from(data: any) {
    return new FavoriteStationModel(
      data._id,
      data.stationId,
      data.title,
      data.image,
      data.url,
    );
  }
}
