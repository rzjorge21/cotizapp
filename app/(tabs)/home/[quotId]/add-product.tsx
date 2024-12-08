import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import CustomHeader from "@/components/CustomHeader";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { ProductsData } from "@/constants/DataDummy";
import { getProducts } from "@/services/productService";
import { Product } from "@/models";
import { useOrderProductStore } from "@/store/orderProductStore";
import { Logger } from "@/utils/logger";

interface Props {
  onSubmit: () => { productId: number; quantity: number };
}

export default function AddOrderProduct({ onSubmit }: Props) {
  const { orderProducts, addOrderProduct, removeOrderProduct } =
    useOrderProductStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>("");

  const handleCreateOrder = () => {
    addOrderProduct({
      productId: selectedId,
      productName: selectedProduct?.name || "",
      quantity: parseInt(quantity),
      price: selectedProduct?.price || 0,
    });
    router.back();
  };

  const handleSelectedProduct = (selectedId: number) => {
    setSelectedId(selectedId);
    const temp = products.find((item) => item.id === selectedId) || null;
    setSelectedProduct(temp);
  };

  const fetchProducts = async () => {
    const result = await getProducts();
    setProducts(result);
    setSelectedId(result[0].id);
    setSelectedProduct(result[0])
  };

  useEffect(() => {
    fetchProducts();
    handleSelectedProduct(0);
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        <CustomHeader />

        <View className="py-2" />
        <Text className="text-2xl font-pbold">Agregar un producto</Text>
        <View className="py-2" />

        <View className="flex justify-center bg-white rounded-full h-12 mb-2">
          <Picker
            selectedValue={selectedId}
            onValueChange={(itemValue, itemIndex) => {
              handleSelectedProduct(itemValue);
            }}
          >
            {products.map((element) => {
              return (
                <Picker.Item
                  key={element.id}
                  label={element.name}
                  value={element.id}
                />
              );
            })}
          </Picker>
        </View>

        <View className="mb-2">
          <TextInput
            className="bg-white text-black placeholder-black px-4 h-12 rounded-full"
            placeholder="Cantidad"
            placeholderTextColor="gray"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
          />
        </View>

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity onPress={handleCreateOrder}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
