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
import { ClientsData } from "@/constants/DataDummy";
import {
  createClient,
  getClientById,
  getClients,
  updateClient,
} from "@/services/clientService";
import { Client } from "@/models";
import { ShowError } from "@/utils/toast";
import { Logger } from "@/utils/logger";

export default function ClientScreen() {
  const { clientId = 0 } = useLocalSearchParams();

  const [isCreating, setIsCreating] = useState(false);
  const [clientObj, setClientObj] = useState<Client | null>(null);

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

  const handleRemovePhoto = () => {
    setSelectedImage(null);
  };

  const getClientData = async () => {
    if (Number(clientId) == -1) {
      setIsCreating(true);
      return;
    }

    const temp = await getClientById(Number(clientId));
    if (temp) {
      setClientObj(temp);
      setName(temp.name);
      setPhoneNumber(temp.phoneNumber || "");
      setSelectedImage(temp.imageUri || null);
    }
  };

  const handleCreateClient = async () => {
    const client: Omit<Client, "id" | "createdAt" | "updatedAt" | "deletedAt"> =
      {
        name: name,
        phoneNumber: phoneNumber,
        imageUri: selectedImage || "",
        createdBy: "DEV",
      };
    const res = await createClient(client);
    router.back();
  };

  const handleUpdateClient = async () => {
    const client: Omit<Client, "id" | "createdAt" | "updatedAt" | "deletedAt"> =
      {
        name: name,
        phoneNumber: phoneNumber,
        imageUri: selectedImage || "",
        createdBy: "DEV",
      };
    const res = await updateClient(Number(clientId), client);
    router.back();
  };

  const handleSaveButton = async () => {
    if (name === "") {
      ShowError("Nombre del cliente no puede ser nulo.");
      return;
    }

    const phoneRegex = /^[0-9]{9}$/; 
    if (phoneNumber !== "" && !phoneRegex.test(phoneNumber)) {
      ShowError("El número de teléfono no es válido.");
      return;
    }

    if (isCreating) {
      handleCreateClient();
    } else {
      handleUpdateClient();
    }
  };

  useEffect(() => {
    getClientData();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        {/* <SafeAreaView className="bg-[#fff7fe] min-h-full p-4 relative"> */}
        <CustomHeader
          rightElement={
            clientId ? (
              <View className="flex flex-row gap-2">
                {/* <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                  <Feather name="file-plus" size={20} color="black" />
                </TouchableOpacity> */}
                <TouchableOpacity className="rounded-full w-11 h-11 bg-black flex justify-center items-center">
                  <Feather name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )
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
          {selectedImage ? (
            <View className="w-36 h-36">
              <TouchableOpacity
                onPress={handleAddPhoto}
                className="bg-white w-36 h-36 rounded-full flex items-center justify-center relative"
              >
                <Image
                  source={{ uri: selectedImage }}
                  className="w-full h-full rounded-full"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRemovePhoto}
                className="bg-black w-9 h-9 flex items-center justify-center rounded-full absolute top-0 right-0 mr-1 mt-1"
              >
                <Feather name="trash" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleAddPhoto}
              className="bg-white w-36 h-36 rounded-full flex items-center justify-center relative"
            >
              <Text className="text-black text-xl">+</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity
            onPress={() => {
              handleSaveButton();
            }}
          >
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="save" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
