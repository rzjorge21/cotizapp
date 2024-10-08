import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useLoadingStore } from "../store/loadingStore";
import { useAuthStore } from "../store/authStore";
import { DemoServices } from "../services";
import { ShowInfo } from "../utils/toast";
import { IS_DEMO } from "../config";
import CustomDemo from "../components/CustomDemo";
import { initDatabase } from "@/lib/sqlite/database";

const App = () => {
  if (IS_DEMO) {
    return <CustomDemo />;
  }

  useEffect(() => {
    initDatabase();
  }, []);

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
