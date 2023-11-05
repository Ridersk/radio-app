import axios from "axios";

const radioInfoApi = axios.create({
  baseURL: "https://api.tunein.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getCategories(): Promise<Array<StationCategory>> {
  try {
    const response = await radioInfoApi.get("/categories/music");
    console.log(response.data);

    const items: Array<any> = response.data?.Items;

    if (!items) {
      console.error("No items found:", items);
      return [];
    }

    const categories: Array<any> = items.find(
      (item) => item?.Title === "Explore"
    )?.Children;

    if (!categories) {
      console.error("No categories found:", categories);
      return [];
    }

    return categories.map((category) => ({
      id: category.GuideId,
      title: category.Title,
      image: category.Image,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
