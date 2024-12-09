import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { ProductsData } from "@/constants/DataDummy";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/models";
import { getProducts } from "@/services/productService";

const Header = ({
  handleCreateProduct,
}: {
  handleCreateProduct: () => void;
}) => (
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
  // const products = ProductsData;
  const [products, setProducts] = useState<Product[]>([]);

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

  const fetchData = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

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
                <Text
                  className="text-sm shrink text-center"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {element.name}
                </Text>
                <View className="h-2 flex w-full items-center justify-center mt-1.5">
                  <View className="h-[1px] bg-black w-3"></View>
                </View>
                <View className="flex flex-row justify-center items-end gap-2 mr-2">
                  <Text className="text-sm">
                    S/.{element.price?.toFixed(2)}
                  </Text>
                  <Text className="text-xs">Precio</Text>
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
