import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { QuotsData } from "../../../constants/DataDummy";
import { router, useFocusEffect } from "expo-router";
import { QUOT_STATES } from "@/config";
import { getOrders } from "@/services/orderService";
import { GetOrderDTO, Product } from "@/models";
import { getProducts, hasProducts } from "@/services/productService";
import { Logger } from "@/utils/logger";
import { hasClients } from "@/services/clientService";
import { ShowError } from "@/utils/toast";

const Home = () => {
  const chips = [
    { id: 0, state: undefined, text: "Todos" },
    { id: 1, state: QUOT_STATES.QUOTATION, text: "Cotizados" },
    { id: 2, state: QUOT_STATES.ORDER, text: "Finalizados" },
  ] as const;

  const [choiceChip, setChoiceChip] = useState<(typeof chips)[number]>(
    chips[0]
  );

  const [orders, setOrders] = useState<GetOrderDTO[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [_hasClients, _setHasClients] = useState<boolean>(false);
  const [_hasProducts, _setHasProducts] = useState<boolean>(false);

  const handleCreateQuot = () => {
    if (_hasClients && _hasProducts) {
      router.push({
        pathname: "/(tabs)/home/[orderId]",
        params: { orderId: -1 },
      });
    } else {
      let errorMessage = "";
      errorMessage += _hasClients ? "" : "Debe tener al menos un cliente creado.\n";
      errorMessage += _hasProducts ? "" : "Debe tener al menos un producto creado.\n";
      ShowError(errorMessage.trim());
    }
  };

  const handleViewQuot = (id: number) => {
    router.push({
      pathname: "/(tabs)/home/[orderId]",
      params: { orderId: id },
    });
  };

  const handleChipClick = (id: number) => {
    const selectedChip = chips.find((chip) => chip.id === id);
    if (selectedChip) {
      setChoiceChip(selectedChip);
      fetchOrders(selectedChip.state);
    } else {
      console.error(`Chip with id ${id} not found`);
    }
  };

  const fetchOrders = async (state?: QUOT_STATES) => {
    const result = await getOrders(state);
    setOrders(result);
  };

  const fetchProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  const fetchHasClients = async () => {
    const result = await hasClients();
    _setHasClients(result);
  };

  const fetchHasProducts = async () => {
    const result = await hasProducts();
    _setHasProducts(result);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
      fetchProducts();
      fetchHasClients();
      fetchHasProducts();
    }, [])
  );

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="p-4">
        <View className="flex flex-row items-center my-2">
          <Text className="text-2xl font-pbold">Quots</Text>
          <View className="ml-auto">
            <TouchableOpacity
              onPress={() => {
                handleCreateQuot();
              }}
              className="rounded-full w-12 h-12 bg-white flex justify-center items-center"
            >
              <Feather name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row w-full justify-between">
          {chips.map((element) => {
            return (
              <TouchableOpacity
                key={element.id.toString()}
                className={
                  choiceChip.id == element.id
                    ? "flex-1 mx-1 items-center justify-center bg-black rounded-full h-10"
                    : "flex-1 mx-1 items-center justify-center bg-white rounded-full h-10"
                }
                onPress={() => handleChipClick(element.id)}
              >
                <Text
                  className={
                    choiceChip.id == element.id ? "text-white" : "text-black"
                  }
                >
                  {element.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="my-2"></View>

        {orders.map((order) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleViewQuot(order.id);
              }}
              key={order.id}
              className="flex flex-row justify-between w-full bg-white rounded-full h-16 p-1 my-0.5"
            >
              <View className="flex flex-row">
                <View className="flex items-center justify-center h-full aspect-square bg-aloha-100 rounded-full">
                  {order.clientImageUri ? (
                    <Image
                      source={{ uri: order.clientImageUri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 999,
                      }}
                    />
                  ) : (
                    <Text className="text-2xl">{order.clientName[0]}</Text>
                  )}
                  {/* <Text className="text-2xl">A</Text> */}
                </View>
                <View className="flex justify-center">
                  <Text className="ml-2 text-lg"># {order.id}</Text>
                </View>
              </View>
              <View className="flex flex-row items-center">
                <View className="flex flex-col mr-2">
                  <Text className="text-right text-xl">
                    S/. {order.totalPrice}
                  </Text>
                  <Text className="text-right text-sm">
                    {new Date(order.createdAt).toDateString()}
                  </Text>
                </View>
                <View
                  className={
                    order.status == QUOT_STATES.QUOTATION
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
