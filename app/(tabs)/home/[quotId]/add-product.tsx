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

export default function Quot() {
  const products = ProductsData;
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<string>("");

  const handleCreateQuot = () => {
    router.back();
  };

  const handleSelectedProduct = (selectedId: any) => {
    setSelectedId(selectedId);
    const temp = ProductsData.find((item) => item.id == selectedId);
    setSelectedProduct(temp);
  };

  useEffect(() => {
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

        <View className="h-4 flex w-full items-center justify-center">
          <View className="h-0.5 bg-black w-8"></View>
        </View>

        {selectedProduct?.attributes.map((element: any) => {
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
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="number-pad"
                  />
                </View>
                <View className="flex flex-1">
                  <TextInput
                    className="flex text-black placeholder-black px-4 h-12 rounded-full border border-gray-400 ml-1"
                    placeholder="Multiplicador"
                    placeholderTextColor="gray"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity onPress={handleCreateQuot}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
