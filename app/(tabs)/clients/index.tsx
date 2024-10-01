import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Header = () => (
  <View className="flex flex-row items-center my-2">
    {/* <Image
      source={{
        uri: "https://img.freepik.com/foto-gratis/retrato-hombre-reir_23-2148859448.jpg",
      }}
      className="w-12 h-12 rounded-full"
      resizeMode="contain"
    />
    <View className="px-4 flex-1">
      <Text className="font-semibold">Hi David!</Text>
      <Text className="text-gray-500">Find a doctor easily</Text>
    </View> */}
    <Text className="text-2xl font-pbold">Clientes</Text>

    <View className="flex flex-row ml-auto">
      <Pressable className="mr-2 rounded-full w-12 h-12 border-aloha-200 bg-white border-2 flex justify-center items-center">
        <Feather name="download" size={24} color="#d45f77" />
      </Pressable>
      <Pressable className="rounded-full w-12 h-12 border-aloha-200 bg-white border-2 flex justify-center items-center">
        <Feather name="plus" size={24} color="#d45f77" />
      </Pressable>
    </View>
  </View>
);

const Clients = () => {
  const clients = [
    { id: 0, name: "Susan", purchases: "08", value: "650.00" },
    { id: 1, name: "Darío", purchases: "10", value: "900.00" },
    { id: 2, name: "Coco", purchases: "02", value: "80.00" },
    { id: 3, name: "Faku", purchases: "01", value: "50.00" },
    { id: 4, name: "Edu", purchases: "04", value: "300.00" },
  ];

  return (
    <SafeAreaView className="bg-[#fff7fe] min-h-screen">
      <ScrollView className="p-4">
        <Header />
        <View className="flex flex-wrap flex-row w-full justify-between">
          {clients.map((element) => {
            return (
              <Pressable key={element.id} className="flex flex-col rounded-[32px] bg-white w-[48%] mb-4 p-4">
                <View className="flex flex-row items-center">
                  <View className="flex items-center justify-center h-14 aspect-square bg-aloha-100 rounded-full">
                    <Text className="text-2xl">{element.name[0]}</Text>
                  </View>
                  <Text className="ml-3 text-lg">{element.name}</Text>
                </View>
                <View className="flex flex-row justify-center mt-2">
                  <View className="flex justify-center mr-2">
                    <Text className="text-base">{element.purchases}</Text>
                    <Text className="text-xs">Compras</Text>
                  </View>
                  <View className="flex justify-center ml-2">
                    <Text className="text-base">{element.value}</Text>
                    <Text className="text-xs">Valor</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clients;
