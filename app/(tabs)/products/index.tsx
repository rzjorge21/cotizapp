import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { router } from "expo-router";
import { ProductsData } from "@/constants/DataDummy";

const Header = ({ handleCreateProduct }: { handleCreateProduct: () => void }) => (
  <View className="flex flex-row items-center my-2">
    <Text className="text-2xl font-pbold">Productos</Text>

    <View className="flex flex-row ml-auto">
      <TouchableOpacity
        onPress={() => {
          handleCreateProduct();
        }}
        className="rounded-full w-12 h-12 bg-white flex justify-center items-center"
      >
        <Feather name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const Products = () => {
  const products = ProductsData;

  const handleCreateProduct = () => {
    router.push({
      pathname: "/(tabs)/products/[productId]",
      params: { productId: -1 },
    });
  };

  const handleEditProduct = (id: number) => {
    router.push({
      pathname: "/(tabs)/products/[productId]",
      params: { productId: id },
    });
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="p-4">
        <Header handleCreateProduct={handleCreateProduct} />
        <View className="flex flex-wrap flex-row w-full justify-between">
          {products.map((element) => {
            return (
              <TouchableOpacity
                key={element.id}
                className="flex flex-col rounded-[32px] bg-white w-[48%] mb-4 p-4"
                onPress={() => {
                  handleEditProduct(element.id);
                }}
              >
                <View className="flex flex-row items-center">
                  <Text className="ml-3 text-base">{element.name}</Text>
                </View>
                <View className="flex flex-row justify-center mt-2">
                  <View className="flex justify-center mr-2">
                    <Text className="text-base">{element.basePrice}</Text>
                    <Text className="text-xs">Precio base</Text>
                  </View>
                  <View className="flex justify-center ml-2">
                    <Text className="text-base">{element.attributes.length}</Text>
                    <Text className="text-xs">Atributos</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
