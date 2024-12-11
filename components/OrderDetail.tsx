import { Client } from "@/models";
import { Text, View } from "react-native";

interface OrderProduct {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

type OrderDetailProps = {
  code: any;
  state: any;
  updatedAt: string;
  client: Client | null;
  orderProducts: OrderProduct[];
};

export function OrderDetail({
  code,
  state,
  client,
  updatedAt,
  orderProducts,
}: OrderDetailProps) {
  const getTotalPrice = () => {
    return orderProducts.reduce((total, orderProduct) => {
      return total + orderProduct.price * orderProduct.quantity;
    }, 0);
  };

  const getDate = () => {
    const date = new Date(updatedAt);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Para formato 24 horas
    });
    return `${formattedDate}, ${formattedTime}`;
  };
  return (
    <View className="p-8 w-full">
      <Text className="text-3xl font-bold text-center">🌺 AlohaCake</Text>
      <Text className="text-base text-center text-gray-400">
        Tel. +51 980568213
      </Text>

      <View className="h-2 flex w-full items-center justify-center my-2">
        <View className="h-[1px] bg-gray-500 w-full"></View>
      </View>
      <View className="px-2">
        <Text className="text-base">Orden: #{code || 0}</Text>
        <Text className="text-base">Fecha: {getDate() || ""}</Text>
        <Text className="text-base">Cliente: {client?.name || ""}</Text>
      </View>
      <View className="h-2 flex w-full items-center justify-center my-2">
        <View className="h-[1px] bg-gray-500 w-full"></View>
      </View>
      <View className="px-2">
        <View className="relative flex flex-row w-full justify-between">
          <Text className="flex-1 font-bold" numberOfLines={1}>
            Descripción
          </Text>
          <Text className="w-12 text-right font-bold">Precio</Text>
        </View>
        {orderProducts.map((orderProduct, index) => {
          return (
            <View key={index} className="flex flex-row w-full justify-between">
              <Text className="flex-1" numberOfLines={1}>
                {orderProduct.quantity} und - {orderProduct.productName}
              </Text>
              <Text className="w-16 text-right">
                S/. {(orderProduct.price * orderProduct.quantity).toFixed(2)}
              </Text>
            </View>
          );
        })}
      </View>
      <View className="h-2 flex w-full items-center justify-center my-2">
        <View className="h-[1px] bg-gray-500 w-full"></View>
      </View>

      <View className="px-2 flex flex-row w-full justify-between">
        <Text className="flex-1 font-bold text-lg" numberOfLines={1}>
          Total
        </Text>
        <Text className="w-24 text-right font-bold text-lg">
          S/. {getTotalPrice().toFixed(2)}
        </Text>
      </View>
      <View className="h-2 flex w-full items-center justify-center my-2">
        <View className="h-[1px] bg-gray-500 w-full"></View>
      </View>
    </View>
  );
}
