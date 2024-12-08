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
import { ClientsData, QuotsData } from "@/constants/DataDummy";
import { Client } from "@/models";
import { getClients } from "@/services/clientService";
import { useOrderProductStore } from "@/store/orderProductStore";
import { Logger } from "@/utils/logger";
import { QUOT_STATES } from "@/config";

export default function Quot() {
  const { quotId = -1 } = useLocalSearchParams();
  const { orderProducts, addOrderProduct, removeOrderProduct } =
    useOrderProductStore();

  const [quotObj, setQuotObj] = useState<object | null>(null);
  const [code, setCode] = useState("");
  const [state, setState] = useState(QUOT_STATES.QUOTATION);

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const handleCreateQuot = () => {
    router.back();
  };

  const getTotalPrice = () => {
    Logger.log(orderProducts)
    return orderProducts.reduce((total, orderProduct) => {
      Logger.log(total)
      return total + orderProduct.price * orderProduct.quantity;
    }, 0);
  };

  const handleCreateProduct = () => {
    router.push({
      pathname: `/(tabs)/home/${quotId}/add-product`,
    });
  };

  const fetchClients = async () => {
    const result = await getClients();
    setClients(result);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const temp = QuotsData.find((item) => item.id.toString() == quotId);
    if (temp) {
      setQuotObj(temp);
      setCode(temp.code);
      setSelectedClient(temp.clientId);
      setState(temp.state);
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        <CustomHeader
          rightElement={
            <>
              {quotObj ? (
                <View className="flex flex-row gap-2">
                  <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                    <Feather name="download" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                    <Feather name="share-2" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity className="rounded-full w-11 h-11 bg-black flex justify-center items-center">
                    <Feather name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </>
          }
        />

        <View className="py-2" />
        {quotObj ? (
          <View className="flex flex-row justify-between">
            <Text className="text-2xl font-pbold">Ver Cotización</Text>
            {state == QUOT_STATES.QUOTATION ? (
              <TouchableOpacity className="flex justify-center items-center bg-aloha-300 rounded-full px-5">
                <Text className="text-xs font-pbold">Cotización</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex justify-center items-center bg-aloha-400 rounded-full px-5">
                <Text className="text-xs font-pbold">Finalizado</Text>
              </View>
            )}
          </View>
        ) : (
          <Text className="text-2xl font-pbold">Crear una cotización</Text>
        )}

        <View className="py-2" />

        <View className="flex justify-center bg-white rounded-full h-12">
          {quotObj && state == QUOT_STATES.ORDER ? (
            <Text className="px-4">
              {clients.find((client) => client.id === selectedClient)?.name}
            </Text>
          ) : (
            <Picker
              selectedValue={selectedClient}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedClient(itemValue)
              }
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
          )}
        </View>

        <View className="h-4 flex w-full items-center justify-center">
          <View className="h-0.5 bg-black w-8"></View>
        </View>

        {orderProducts ? (
          orderProducts.map((orderProduct, index) => {
            return (
              <TouchableOpacity
                key={orderProduct.productId}
                className="flex items-center justify-between flex-row bg-white placeholder-black px-4 h-12 rounded-full mb-2"
              >
                <Text>
                  {orderProduct.quantity} und - {orderProduct.productName}
                </Text>
                {quotObj && state == QUOT_STATES.ORDER ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    className="rounded-full h-7 aspect-square bg-black flex justify-center items-center"
                    onPress={() => {
                      removeOrderProduct(orderProduct.productId);
                    }}
                  >
                    <Feather name="trash" size={16} color="white" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <></>
        )}

        {quotObj && state == QUOT_STATES.ORDER ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleCreateProduct();
            }}
            className="flex items-center justify-center bg-black h-14 rounded-full mb-2"
          >
            <Text className="text-base text-white">Producto (+)</Text>
          </TouchableOpacity>
        )}

        {/* Save Button */}
        {quotObj && state == QUOT_STATES.ORDER ? (
          <></>
        ) : (
          <View className="absolute bottom-0 right-0 p-4">
            <TouchableOpacity onPress={handleCreateQuot}>
              <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
                <Feather name="save" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Total Price */}
        <View className="absolute bottom-0 left-0 px-4 py-10">
          <Text className="text-lg"> Total: S/. {getTotalPrice().toFixed(2)}</Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
