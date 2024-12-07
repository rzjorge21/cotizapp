import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { ProductsData } from "@/constants/DataDummy";
import { Product } from "@/models";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "@/services/productService";

export default function ProductScreen() {
  const { productId = 0 } = useLocalSearchParams();

  const [isCreating, setIsCreating] = useState(false);
  const [productObj, setProductObj] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState(0);

  const getProductData = async () => {
    if (Number(productId) == -1) {
      setIsCreating(true);
      return;
    }

    const temp = await getProductById(Number(productId));
    if (temp) {
      setProductObj(temp);
      setName(temp.name || "");
      setBasePrice(temp.price);
    }
  };

  const handleCreateProduct = async () => {
    console.log("Creating data");
    const product: Omit<
      Product,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    > = {
      name: name,
      price: basePrice,
      createdBy: "DEV",
    };
    const res = await createProduct(product);
    console.log(res);
    router.back();
  };

  const handleUpdateProduct = async () => {
    const product: Omit<
      Product,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    > = {
      name: name,
      price: basePrice,
      createdBy: "DEV",
    };
    const res = await updateProduct(Number(productId), product);
    console.log(res);
    router.back();
  };

  const handleSaveButton = async () => {
    if (isCreating) {
      handleCreateProduct();
    } else {
      handleUpdateProduct();
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <SafeAreaView className="min-h-full relative">
      <ScrollView className="p-4">
        <CustomHeader
          rightElement={
            productObj ? (
              <View className="flex flex-row gap-2">
                <TouchableOpacity className="rounded-full w-11 h-11 bg-black flex justify-center items-center">
                  <Feather name="trash" size={20} color="white" />
                  {/* <Feather name="download" size={24} color="#d45f77" /> */}
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )
          }
        />

        <View className="py-2" />
        {productObj ? (
          <Text className="text-2xl font-pbold">Editar un producto</Text>
        ) : (
          <Text className="text-2xl font-pbold">Agregar un producto</Text>
        )}

        <View className="py-2" />

        <View className="mb-4">
          <TextInput
            className="bg-white text-black placeholder-black p-3 rounded-full"
            placeholder="Nombre"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-2">
          <TextInput
            className="bg-white text-black placeholder-black p-3 rounded-full"
            placeholder="Precio base"
            placeholderTextColor="gray"
            value={basePrice.toString()}
            onChangeText={(e) => {
              setBasePrice(Number(e));
            }}
            keyboardType="phone-pad"
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="absolute bottom-0 right-0 p-4">
        <TouchableOpacity onPress={handleSaveButton}>
          <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
            <Feather name="save" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
