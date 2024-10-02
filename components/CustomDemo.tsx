import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import { DemoServices } from "../services";
import { ShowInfo } from "../utils/toast";
import { useLoadingStore } from "../store/loadingStore";
import { useAuthStore } from "../store/authStore";

export default function CustomDemo() {
  
  const { showLoading, hideLoading } = useLoadingStore();
  const { login, logout, isLoggedIn } = useAuthStore();

  const getRandomQuote = async () => {
    try {
      showLoading();
      const data = await DemoServices.RandomFact();
      ShowInfo(data.fact);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <SafeAreaView className="bg-[#f7f7ff] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <CustomButton
            title="Get Random Quote"
            handlePress={getRandomQuote}
            containerStyles="w-full mt-7"
          />

          <Text className="text-black">
            {isLoggedIn ? "logueado" : "no logueado"}
          </Text>
          <CustomButton
            title="Login"
            handlePress={login}
            containerStyles="w-full mt-7"
          />
          <CustomButton
            title="Logout"
            handlePress={logout}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

