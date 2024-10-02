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
import * as ImagePicker from "expo-image-picker";
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

  const handleAddPhoto = async () => {
    // Ask for permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCreateUser = () => {
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
            placeholder="Teléfono (opcional)"
            placeholderTextColor="gray"
            value={basePrice}
            onChangeText={setBasePrice}
            keyboardType="phone-pad"
          />
        </View>
        
        <View className="h-4 flex w-full items-center justify-center">
          <View className="h-0.5 bg-black w-8"></View>
        </View>
        {/* Image Picker */}
        <View className="flex items-center mt-5">
          <TouchableOpacity
            onPress={handleAddPhoto}
            className="bg-white w-36 h-36 rounded-full flex items-center justify-center"
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="w-36 h-36 rounded-full"
              />
            ) : (
              <Text className="text-black text-xl">+</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity onPress={handleCreateUser}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="save" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
