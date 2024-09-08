import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Products = () => {
  return (
    <SafeAreaView className="bg-[#f7f7ff] min-h-screen">
      <ScrollView className="p-4">
        <Text>Product</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
