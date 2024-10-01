import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useLoadingStore } from "../store/loadingStore";
import { useAuthStore } from "../store/authStore";
import { DemoServices } from "../services";
import { ShowInfo } from "../utils/toast";
import { IS_DEMO } from "../config";

const App = () => {
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

  if (IS_DEMO) {
    return (
      <SafeAreaView className="bg-[#f7f7ff] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <CustomButton
              title="Get Random Quote"
              handlePress={getRandomQuote}
              containerStyles="w-full mt-7"
            />
            
            <Text className="text-black">{isLoggedIn ? 'logueado' : 'no logueado'}</Text>
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

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.splash}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative">
            <Text className="text-3xl font-bold text-center">
              Cotiz<Text className="text-aloha-500">App</Text>
            </Text>
          </View>

          <Text className="text-sm text-gray-500 font-medium mt-8 text-center">
            The app you were waiting for to schedule your appointments
          </Text>

          <View className="my-2"></View>

          <CustomButton
            title="Login"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-7 bg-white border-2 border-aloha-500 text-black"
            textStyles="text-aloha-500"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
