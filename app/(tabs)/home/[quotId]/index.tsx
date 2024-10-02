import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
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
import { ClientData, QuotsData } from "@/constants/DataDummy";

export default function Quot() {
  const { quotId = -1 } = useLocalSearchParams();

  const [quotObj, setQuotObj] = useState<object | null>(null);
  const [code, setCode] = useState("");

  const clients = ClientData;
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const handleCreateQuot = () => {
    router.back();
  };

  useEffect(() => {
    const temp = QuotsData.find((item) => item.id.toString() == quotId);
    if (temp) {
      setQuotObj(temp);
      setCode(temp.code);
      setSelectedClient(temp.clientId);
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        <CustomHeader
          rightElement={
            <View className="flex flex-row gap-2">
              <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                <Feather name="upload" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                <Feather name="share-2" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full w-11 h-11 bg-black flex justify-center items-center">
                <Feather name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          }
        />

        <View className="py-2" />
        {quotObj ? (
          <View className="flex flex-row justify-between">
            <Text className="text-2xl font-pbold">Ver Cotización</Text>
            <View className="flex justify-center items-center bg-aloha-300 rounded-full px-5">
              <Text className="text-xs font-pbold">Finalizado</Text>
            </View>
          </View>
        ) : (
          <Text className="text-2xl font-pbold">Crear una cotización</Text>
        )}

        <View className="py-2" />

        <View className="mb-2">
          <TextInput
            className="bg-white text-black placeholder-black p-3 rounded-full"
            placeholder="Nombre"
            placeholderTextColor="gray"
            value={code}
            onChangeText={setCode}
          />
        </View>

        <View className="bg-white rounded-full">
          <Picker
            selectedValue={selectedClient}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedClient(itemValue)
            }
            className="w-full"
          >
            {clients.map((element) => {
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

        <View className="h-4 flex w-full items-center justify-center">
          <View className="h-0.5 bg-black w-8"></View>
        </View>

        <View className="flex items-center justify-between flex-row bg-white placeholder-black px-3 h-14 rounded-full mb-2">
          <Text className="text-base">2 und - Caja de alfajor</Text>
          <TouchableOpacity className="rounded-full h-7 aspect-square bg-black flex justify-center items-center">
            <Feather name="trash" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View className="bg-white placeholder-black p-3 rounded-[32px] mb-2">
          <View className="flex items-center justify-between flex-row">
            <Text className="text-base">1 und - Torta 15 cm</Text>
            <TouchableOpacity className="rounded-full h-7 aspect-square bg-black flex justify-center items-center">
              <Feather name="trash" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View className="h-4 flex w-full items-center justify-center">
            <View className="h-0.5 bg-black w-8"></View>
          </View>
          <View className="flex items-center justify-between flex-row">
            <Text className="text-base">Nro Base</Text>
            <Text className="text-base">14</Text>
          </View>
        </View>

        <TouchableOpacity className="flex items-center justify-center bg-black h-14 rounded-full mb-2">
          <Text className="text-base text-white">Product (+)</Text>
        </TouchableOpacity>

        {/* <View className="mb-4">
          <TextInput
            className="bg-white text-black placeholder-black p-3 rounded-full"
            placeholder="Teléfono (opcional)"
            placeholderTextColor="gray"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View> */}

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity onPress={handleCreateQuot}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="save" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Total Price */}
        <View className="absolute bottom-0 left-0 px-4 py-10">
          <Text className="text-lg"> Total: S/. 24.00</Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
