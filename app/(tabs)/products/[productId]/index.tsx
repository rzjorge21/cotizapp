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
import CustomHeader from "@/components/CustomHeader";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { ProductsData } from "@/constants/DataDummy";

export default function Client() {
  const { productId = 0 } = useLocalSearchParams();

  const [productObj, setProductObj] = useState<object | null>(null);
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreateProduct = () => {
    router.back();
  };

  useEffect(() => {
    const temp = ProductsData.find((item) => item.id.toString() == productId);
    if (temp) {
      setProductObj(temp);
      setName(temp.name);
      setBasePrice(temp.basePrice);
      // setSelectedImage(temp.imageUri)
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        {/* <SafeAreaView className="bg-[#fff7fe] min-h-full p-4 relative"> */}
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

        <View className="mb-4">
          <TextInput
            className="bg-white text-black placeholder-black p-3 rounded-full"
            placeholder="Precio base"
            placeholderTextColor="gray"
            value={basePrice}
            onChangeText={setBasePrice}
            keyboardType="phone-pad"
          />
        </View>

        <View className="h-4 flex w-full items-center justify-center">
          <View className="h-0.5 bg-black w-8"></View>
        </View>

        {productObj?.attributes.map((element: any) => {
          return (
            <View
              key={element}
              className="flex items-center flex-col bg-white placeholder-black px-4 py-2 rounded-[32px] mb-2"
            >
              <View className="flex w-full items-center justify-between flex-row mb-2">
                <Text className="text-base">Atributo #{element}</Text>

                <TouchableOpacity className="rounded-full h-7 aspect-square bg-black flex justify-center items-center">
                  <Feather name="trash" size={16} color="white" />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row">
                <View className="flex flex-1">
                  <TextInput
                    className="flex text-black placeholder-black px-4 h-12 rounded-full border border-gray-400 mr-1"
                    placeholder="Cantidad"
                    placeholderTextColor="gray"
                    value={name}
                    onChangeText={setName}
                    keyboardType="number-pad"
                  />
                </View>
                <View className="flex flex-1">
                  <TextInput
                    className="flex text-black placeholder-black px-4 h-12 rounded-full border border-gray-400 ml-1"
                    placeholder="Multiplicador"
                    placeholderTextColor="gray"
                    value={basePrice}
                    onChangeText={setBasePrice}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          onPress={() => {
            handleCreateProduct();
          }}
          className="flex items-center justify-center bg-black h-14 rounded-full mb-2"
        >
          <Text className="text-base text-white">Atributo (+)</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity onPress={handleCreateProduct}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="save" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
