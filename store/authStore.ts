import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // Nombre para la clave en AsyncStorage, debe ser único
      storage: createJSONStorage(() => AsyncStorage), // Persistencia de datos
    }
  )
);
