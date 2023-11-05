import { getCategories } from "@/src/api/radioApi";
import { useEffect, useState } from "react";
import { FlatList, View, Image } from "react-native";
import { Card } from "react-native-paper";

function CategoriesGrid() {
  const [categories, setCategories] = useState<StationCategory[]>();

  async function handleGetCategory() {
    const categoriesList = await getCategories();
    setCategories(categoriesList);
  }

  useEffect(() => {
    handleGetCategory();
  }, []);

  const renderCategory = (category: StationCategory) => (
    <Card style={{ flex: 1, margin: 4 }}>
      <Card.Content>
        <Card.Title
          title={category.title}
          titleVariant="titleSmall"
          right={() => <Image source={{ uri: category.image }} height={50} width={50} />}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={({ item }) => renderCategory(item)}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
}

export default CategoriesGrid;
