import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import CategoriesGrid from "@/src/components/CategoriesGrid";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CategoriesGrid />
    </SafeAreaView>
  );
}

export default HomeScreen;
