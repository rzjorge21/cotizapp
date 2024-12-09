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
import { Client } from "@/models";
import { getClients } from "@/services/clientService";
import { useOrderProductStore } from "@/store/orderProductStore";
import { Logger } from "@/utils/logger";
import { QUOT_STATES } from "@/config";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
  updateStatusToCompleted,
} from "@/services/orderService";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { BackHandler } from "react-native";
import { ShowError } from "@/utils/toast";

export default function Quot() {
  const params = useLocalSearchParams<{ orderId?: string }>();
  const orderId = Number(params.orderId) || -1;
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const {
    orderProducts,
    addOrderProduct,
    removeOrderProduct,
    setOrderProducts,
    clearOrderProducts,
  } = useOrderProductStore();

  const [code, setCode] = useState("");
  const [state, setState] = useState(QUOT_STATES.QUOTATION);

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const handleSaveOrder = async () => {
    if (orderProducts.length == 0) {
      ShowError("La cotización tiene que tener al menos 1 producto.");
      return;
    }

    const payload = {
      clientId: selectedClient || 1,
      items: orderProducts.map((orderProduct) => {
        return {
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
        };
      }),
    };

    isCreating
      ? await createOrder(payload.clientId, payload.items)
      : await updateOrder(orderId, payload.clientId, payload.items);

    handlePressBack();
  };

  const handleDeleteOrder = async () => {
    await deleteOrder(orderId).then(() => {
      handlePressBack();
    });
  };

  const handleUpdateStatusToCompleted = async () => {
    const payload = {
      clientId: selectedClient || 1,
      items: orderProducts.map((orderProduct) => {
        return {
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
        };
      }),
    };
    await updateOrder(orderId, payload.clientId, payload.items).then(
      async () => {
        await updateStatusToCompleted(orderId).then(() => {
          fetchOrder();
        });
      }
    );
  };

  const getTotalPrice = () => {
    return orderProducts.reduce((total, orderProduct) => {
      return total + orderProduct.price * orderProduct.quantity;
    }, 0);
  };

  const handleAddOrderProduct = (productId: number = -1) => {
    router.push({
      pathname: "/(tabs)/home/[orderId]/[productId]",
      params: { orderId, productId },
    });
  };

  const fetchClients = async () => {
    const result = await getClients();
    setClients(result);
    return result;
  };

  const fetchOrder = async () => {
    if (isCreating) return;
    const result = await getOrderById(orderId);
    if (result) {
      setSelectedClient(result.clientId);
      setOrderProducts(result.items);
      setState(result.status);
    }
  };

  const handlePressBack = () => {
    clearOrderProducts();
    router.back();
    return true;
  };

  BackHandler.addEventListener("hardwareBackPress", handlePressBack);

  useEffect(() => {
    fetchClients().then((clients) => {
      if (orderId == -1) {
        setSelectedClient(clients[0].id);
        setIsCreating(true);
      } else {
        const _order = fetchOrder();
      }
    });
    fetchOrder();

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handlePressBack);
    };
  }, [router]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        <CustomHeader
          onBackPress={() => {
            clearOrderProducts();
          }}
          rightElement={
            <>
              {!isCreating ? (
                <View className="flex flex-row gap-2">
                  {/* <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                    <Feather name="download" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity className="rounded-full w-11 h-11 bg-white flex justify-center items-center">
                    <Feather name="share-2" size={20} color="black" />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteOrder();
                    }}
                    className="rounded-full w-11 h-11 bg-black flex justify-center items-center"
                  >
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
        {!isCreating ? (
          <View className="flex flex-row justify-between">
            <Text className="text-2xl font-pbold">Ver Cotización</Text>
            {state == QUOT_STATES.QUOTATION ? (
              <TouchableOpacity
                onPress={() => {
                  handleUpdateStatusToCompleted();
                }}
                className="flex justify-center items-center bg-aloha-300 rounded-full px-5"
              >
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
          <Picker
            selectedValue={selectedClient}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedClient(itemValue)
            }
            enabled={!(state == QUOT_STATES.ORDER)}
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

        {orderProducts ? (
          orderProducts.map((orderProduct, index) => {
            return (
              <TouchableOpacity
                disabled={!isCreating && state == QUOT_STATES.ORDER}
                key={orderProduct.productId}
                onPress={() => {
                  handleAddOrderProduct(orderProduct.productId);
                }}
                className="flex items-center justify-between flex-row bg-white placeholder-black px-4 h-12 rounded-full mb-2"
              >
                <Text
                  className={state == QUOT_STATES.ORDER ? "text-zinc-400" : ""}
                >
                  {orderProduct.quantity} und - {orderProduct.productName}
                </Text>
                {!isCreating && state == QUOT_STATES.ORDER ? (
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

        {!isCreating && state == QUOT_STATES.ORDER ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleAddOrderProduct();
            }}
            className="flex items-center justify-center bg-black h-14 rounded-full mb-2"
          >
            <Text className="text-base text-white">Producto (+)</Text>
          </TouchableOpacity>
        )}

        {/* Save Button */}
        {!isCreating && state == QUOT_STATES.ORDER ? (
          <></>
        ) : (
          <View className="absolute bottom-0 right-0 p-4">
            <TouchableOpacity onPress={handleSaveOrder}>
              <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
                <Feather name="save" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Total Price */}
        <View className="absolute bottom-0 left-0 px-4 py-10">
          <Text className="text-lg">
            {" "}
            Total: S/. {getTotalPrice().toFixed(2)}
          </Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
