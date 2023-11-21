import axios from "axios";
import { formatUrlToHttps } from "../utils/urlUtils";

const radioApi = axios.create({
  baseURL: "https://api.tunein.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const radioStreamApi = axios.create({
  baseURL: "https://opml.radiotime.com/Tune.ashx",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const ACCEPTED_FORMATS = "mp3,aac";
const API_VERSION = "5.97";

export async function getCategories(): Promise<StationCategory[]> {
  try {
    const response = await radioApi.get("/categories/music", {
      params: {
        version: API_VERSION,
      },
    });
    console.log("Category Groups:", response.data);

    const items: any[] = response.data?.Items;
    if (!items) {
      console.error("No items found:", items);
      return [];
    }

    const categories: any[] = items.find(
      (item) => item?.Title === "Explore"
    )?.Children;
    if (!categories) {
      console.error("No categories found:", categories);
      return [];
    }

    return categories.map((category) => ({
      id: category.GuideId,
      title: category.Title,
      image: formatUrlToHttps(category.Image),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStationsByCategory(
  categoryId: string,
  page: number = 0
): Promise<StationBase[]> {
  try {
    const stationsPerPage = 30;
    const response = await radioApi.get(`/categories/${categoryId}`, {
      params: {
        filter: "s:free",
        limit: stationsPerPage,
        offset: page * stationsPerPage,
        version: API_VERSION,
      },
    });
    console.log("Stations:", response.data);

    const stations: any[] = response.data?.Items;
    if (!stations) {
      console.error("No stations found:", stations);
      return [];
    }

    return stations.map((station) => ({
      id: station.GuideId,
      title: station.Title,
      image: formatUrlToHttps(station.Image),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchStationsByText(
  searchText: string,
  page: number = 0
): Promise<StationBase[]> {
  try {
    const stationsPerPage = 30;
    const response = await radioApi.get("/profiles", {
      params: {
        fullTextSearch: true,
        query: searchText,
        filter: "s",
        ignoreCategoryRedirects: true,
        formats: ACCEPTED_FORMATS,
        limit: stationsPerPage,
        offset: page * stationsPerPage,
        version: API_VERSION,
      },
    });
    console.log("Stations searched full text:", response.data);

    const stations: any[] = response.data?.Items;
    if (!stations) {
      console.error("No stations found:", stations);
      return [];
    }

    return stations.map((station) => ({
      id: station.GuideId,
      title: station.Title,
      image: formatUrlToHttps(station.Image),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStationStream(id: string): Promise<string> {
  try {
    const response = await radioStreamApi.get("", {
      params: {
        type: "station",
        id: id,
        render: "json",
        formats: ACCEPTED_FORMATS,
        version: API_VERSION,
      },
    });
    console.log("Station stream data:", response.data);

    const streamOptions: any[] = response.data?.body;
    if (!streamOptions) {
      console.error("No stream options found:", streamOptions);
      return "";
    }

    const selectedStreamOption: any = streamOptions[0];
    if (!selectedStreamOption) {
      console.error("No stream option selected:", selectedStreamOption);
      return "";
    }

    return formatUrlToHttps(selectedStreamOption.url);
  } catch (error) {
    console.error(error);
    return "";
  }
}
