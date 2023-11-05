import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native";

import styles from "./styles";
import CategoriesGrid from "@/src/components/CategoriesGrid";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CategoriesGrid />
      {/* <StationsList stations={stations}/> */}
    </SafeAreaView>
  );
}

export default HomeScreen;
