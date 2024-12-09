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
import { ProductsData } from "@/constants/DataDummy";
import { getProducts } from "@/services/productService";
import { Product } from "@/models";
import { useOrderProductStore } from "@/store/orderProductStore";
import { Logger } from "@/utils/logger";
import {
  useGlobalSearchParams,
  useSearchParams,
} from "expo-router/build/hooks";
import { ShowError } from "@/utils/toast";

export default function AddOrderProduct() {
  const params = useLocalSearchParams<{ productId?: string }>();
  const productId = Number(params.productId) || -1;
  const [isCreating, setIsCreating] = useState(false);

  const {
    orderProducts,
    addOrderProduct,
    removeOrderProduct,
    getOrderProductById,
    updateOrderProductQuantity,
  } = useOrderProductStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [quantity, setQuantity] = useState<string>("");

  const handleCreateOrder = () => {
    try {
      if (quantity === "") {
        ShowError("La cantidad no puede ser nula.");
        return;
      }

      if (Number(quantity) <= 0) {
        ShowError("El cantidad no puede ser menor o igual a 0.");
        return;
      }

      if (isCreating) {
        Logger.log("📦 Creating orderProduct.");
        const selectedProduct = products.find(
          (product) => product.id == selectedId
        );
        addOrderProduct({
          productId: selectedId,
          productName: selectedProduct?.name || "",
          quantity: Number(quantity),
          price: selectedProduct?.price || 0,
        });
      } else {
        Logger.log("📦 Updating quantity on orderProduct.");
        updateOrderProductQuantity(productId, Number(quantity));
      }
      router.back();
    } catch {
      Logger.log(`❌ Error creating or updating a productOrder.`);
    }
  };

  const fetchProducts = async () => {
    const result = await getProducts();
    setProducts(result);
    return result;
  };

  const handleSelectedProduct = (selectedId: number) => {
    const temp = products.find((product) => product.id === selectedId) || null;
    setSelectedId(selectedId);
  };

  useEffect(() => {
    fetchProducts().then((products) => {
      if (productId == -1) {
        setSelectedId(products[0].id);
        setIsCreating(true);
      } else {
        const _product = getOrderProductById(productId);
        setQuantity(_product?.quantity.toString() || "");
        handleSelectedProduct(_product?.productId || 0);
      }
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="min-h-full p-4 relative">
        <CustomHeader />

        <View className="py-2" />
        <Text className="text-2xl font-pbold">Agregar un producto</Text>
        <View className="py-2" />

        <View className="flex justify-center bg-white rounded-full h-12 mb-2">
          <Picker
            selectedValue={selectedId}
            onValueChange={(itemValue, itemIndex) => {
              handleSelectedProduct(itemValue);
            }}
            enabled={isCreating}
          >
            {products.map((product) => {
              return (
                <Picker.Item
                  key={product.id}
                  label={product.name}
                  value={product.id}
                />
              );
            })}
          </Picker>
        </View>

        <View className="mb-2">
          <TextInput
            className="bg-white text-black placeholder-black px-4 h-12 rounded-full"
            placeholder="Cantidad"
            placeholderTextColor="gray"
            value={quantity}
            onChangeText={(e) => {
              const sanitizedValue = e.replace(",", ".");
              const numericValue = parseFloat(sanitizedValue);
              if (!isNaN(numericValue)) {
                setQuantity(numericValue.toString());
              } else {
                setQuantity("");
              }
            }}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Save Button */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity onPress={handleCreateOrder}>
            <View className="bg-aloha-400 w-16 h-16 rounded-full flex items-center justify-center">
              <Feather name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
