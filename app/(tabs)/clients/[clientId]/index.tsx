import { View, Text, Pressable, ScrollView, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
// import { DoctorData } from "../../../../../constants/DataDummy";
// import CustomButton from "../../../../../components/CustomButton";
// import CustomTabs from "../../../../../components/CustomTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "@/components/CustomHeader";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { ClientData } from "@/constants/DataDummy";
// import CustomStat from "../../../../../components/CustomStats";

export default function Doctor() {
  const { clientId = 0 } = useLocalSearchParams();

  const [clientObj, setClientObj] = useState<object | null>(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    const temp = ClientData.find((item) => item.id.toString() == clientId);
    if (temp) {
      setClientObj(temp);
      setName(temp.name);
      setPhoneNumber(temp.phoneNumber);
      setSelectedImage(temp.imageUri)
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-[#fff7fe] min-h-full p-4 relative">
        <CustomHeader
          rightElement={
            <View className="flex flex-row gap-2">
              <Pressable className="rounded-full w-11 h-11 border-aloha-200 bg-white border-2 flex justify-center items-center">
                <Feather name="download" size={24} color="#d45f77" />
              </Pressable>
            </View>
          }
        />

        <View className="py-2" />
        {clientObj ? (
          <Text className="text-2xl font-pbold">Editar un cliente</Text>
        ) : (
          <Text className="text-2xl font-pbold">Agregar un cliente</Text>
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
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Image Picker */}
        <View className="flex items-center mt-5">
          <Pressable
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
          </Pressable>
        </View>

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <Pressable onPress={handleCreateUser}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="save" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
