import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { ClientsData } from "@/constants/DataDummy";
import { useEffect, useState } from "react";
import { getClients } from "@/services/clientService";
import { Client } from "@/models";

const Header = ({ handleCreateClient }: { handleCreateClient: () => void }) => (
  <View className="flex flex-row items-center my-2">
    <Text className="text-2xl font-pbold">Clientes</Text>

    <View className="flex flex-row ml-auto">
      <TouchableOpacity className="mr-2 rounded-full w-12 h-12 bg-white flex justify-center items-center">
        <Feather name="download" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleCreateClient();
        }}
        className="rounded-full w-12 h-12 bg-white flex justify-center items-center"
      >
        <Feather name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const Clients = () => {
  // const clients = ClientsData;
  const [clients, setClients] = useState<Client[]>([]);

  const handleCreateClient = () => {
    router.push({
      pathname: "/(tabs)/clients/[clientId]",
      params: { clientId: -1 },
    });
  };

  const handleEditClient = (id: number) => {
    router.push({
      pathname: "/(tabs)/clients/[clientId]",
      params: { clientId: id },
    });
  };

  const initData = async () => {
    const result = await getClients();
    setClients(result);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="p-4">
        <Header handleCreateClient={handleCreateClient} />
        <View className="flex flex-wrap flex-row w-full justify-between">
          {clients.map((element) => {
            return (
              <TouchableOpacity
                key={element.id}
                className="flex flex-col rounded-[32px] bg-white w-[48%] mb-4 p-4"
                onPress={() => {
                  handleEditClient(element.id);
                }}
              >
                <View className="flex flex-row items-center">
                  <View className="flex items-center justify-center h-14 aspect-square bg-aloha-100 rounded-full">
                    {/* {element.imageUri ? (
                      <Image
                        source={{ uri: element.imageUri }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 999,
                        }}
                        // resizeMode="cover"
                      />
                    ) : (
                      <Text className="text-2xl">{element.name[0]}</Text>
                    )} */}
                    <Text className="text-2xl">{element.name[0].toUpperCase()}</Text>
                  </View>
                  <Text className="ml-3 text-lg">{element.name}</Text>
                </View>
                <View className="flex flex-row justify-center mt-2">
                  <View className="flex justify-center mr-2">
                    {/* <Text className="text-base">{element.purchases}</Text> */}
                    <Text className="text-base">00</Text>
                    <Text className="text-xs">Compras</Text>
                  </View>
                  <View className="flex justify-center ml-2">
                    {/* <Text className="text-base">{element.value}</Text> */}
                    <Text className="text-base">00</Text>
                    <Text className="text-xs">Valor</Text>
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

export default Clients;
