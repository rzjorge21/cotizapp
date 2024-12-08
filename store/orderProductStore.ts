import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OrderProduct {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface OrderProductState {
  orderProducts: OrderProduct[];
  addOrderProduct: (orderProduct: OrderProduct) => void;
  removeOrderProduct: (productId: number) => void;
}

export const useOrderProductStore = create<OrderProductState>()(
  persist(
    (set) => ({
      orderProducts: [],
      addOrderProduct: (orderProduct: OrderProduct) =>
        set((state) => {
          // Verificar si el producto ya existe
          const existingProductIndex = state.orderProducts.findIndex(
            (p) => p.productId === orderProduct.productId
          );

          if (existingProductIndex !== -1) {
            // Si el producto existe, actualizamos su cantidad
            const updatedOrderProducts = [...state.orderProducts];
            updatedOrderProducts[existingProductIndex].quantity +=
              orderProduct.quantity;

            return { orderProducts: updatedOrderProducts };
          } else {
            // Si el producto no existe, lo agregamos como un nuevo elemento
            return { orderProducts: [...state.orderProducts, orderProduct] };
          }
        }),
      removeOrderProduct: (productId: number) =>
        set((state) => ({
          orderProducts: state.orderProducts.filter(
            (orderProduct) => orderProduct.productId !== productId
          ),
        })),
    }),
    {
      name: "order-product-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
