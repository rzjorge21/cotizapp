import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { QuotsData } from "../../../constants/DataDummy";
import { router } from "expo-router";
import { QUOT_STATES } from "@/config";

const Header = ({ handleCreateQuot }: { handleCreateQuot: () => void }) => (
  <View className="flex flex-row items-center my-2">
    <Text className="text-2xl font-pbold">Quots</Text>
    <View className="ml-auto">
      <TouchableOpacity
        onPress={() => {
          handleCreateQuot();
        }}
        // className="rounded-full w-12 h-12 border-aloha-200 bg-white border-2 flex justify-center items-center"
        className="rounded-full w-12 h-12 bg-white flex justify-center items-center"
      >
        <Feather name="plus" size={20} color="black" />
        {/* <Feather name="plus" size={24} color="#d45f77" /> */}
      </TouchableOpacity>
    </View>
  </View>
);

const Home = () => {
  const [choiceChip, setChoiceChip] = useState(0);
  const chips = [
    { id: 0, state: null, text: "Todos" },
    { id: 1, state: QUOT_STATES.QUOTATION, text: "Cotizados" },
    { id: 2, state: QUOT_STATES.ORDER, text: "Finalizados" },
  ];

  const quots = QuotsData;

  const [filteredQuots, setFilteredQuots] = useState(quots);

  const handleCreateQuot = () => {
    router.push({
      pathname: "/(tabs)/home/[quotId]",
      params: { quotId: -1 },
    });
  };

  const handleViewQuot = (id: number) => {
    router.push({
      pathname: "/(tabs)/home/[quotId]",
      params: { quotId: id },
    });
  };

  const handleChipClick = (id: number) => {
    setChoiceChip(id);
    if (id == 0) {
      setFilteredQuots(quots);
    } else if (id == 1) {
      setFilteredQuots(
        quots.filter((element) => {
          return element.state == 0;
        })
      );
    } else {
      setFilteredQuots(
        quots.filter((element) => {
          return element.state == 1;
        })
      );
    }
  };

  return (
    // <SafeAreaView className="bg-[#fff7fe] min-h-screen">
    <SafeAreaView className="min-h-screen">
      <ScrollView className="p-4">
        <Header handleCreateQuot={handleCreateQuot} />

        <View className="flex flex-row w-full justify-between">
          {chips.map((element) => {
            return (
              <TouchableOpacity
                key={element.id.toString()}
                className={
                  choiceChip == element.id
                    ? "flex-1 mx-1 items-center justify-center bg-black rounded-full h-10"
                    : "flex-1 mx-1 items-center justify-center bg-white rounded-full h-10"
                }
                onPress={() => handleChipClick(element.id)}
              >
                <Text
                  className={
                    choiceChip == element.id ? "text-white" : "text-black"
                  }
                >
                  {element.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="my-2"></View>

        {filteredQuots.map((element) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleViewQuot(element.id);
              }}
              key={element.id}
              className="flex flex-row justify-between w-full bg-white rounded-full h-16 p-1 my-0.5"
            >
              <View className="flex flex-row">
                <View className="flex items-center justify-center h-full aspect-square bg-aloha-100 rounded-full">
                  <Text className="text-2xl">A</Text>
                </View>
                <View className="flex justify-center">
                  <Text className="ml-2 text-lg"># {element.code}</Text>
                </View>
              </View>
              <View className="flex flex-row items-center">
                <View className="flex flex-col mr-2">
                  <Text className="text-right text-xl">{element.price}</Text>
                  <Text className="text-right text-sm">{element.date}</Text>
                </View>
                <View
                  className={
                    element.state == 0
                      ? "h-full aspect-[1/2] bg-aloha-300 rounded-r-full"
                      : "h-full aspect-[1/2] bg-aloha-400 rounded-r-full"
                  }
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <View className="my-12"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
