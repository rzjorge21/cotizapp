import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

type Props = {
  title?: string;
  rightElement?: React.ReactNode;
  otherStyles?: string;
};

export default function CustomHeader({
  title,
  rightElement,
  otherStyles,
}: Props) {
  return (
    <View className={`flex flex-row items-center ${otherStyles}`}>
      <View className="mr-auto">
        <Pressable
          className="rounded-full w-11 h-11 bg-white flex justify-center items-center"
          onPress={() => {
            router.back();
          }}
        >
          <Feather name="chevron-left" size={20} color="black" />
          {/* <Feather name="chevron-left" size={24} color="#d45f77" /> */}
        </Pressable>
      </View>
      <View className="flex-1">
        <Text className="text-xl text-center">{title ? title : ""}</Text>
      </View>
      <View className="mr-auto h-11">{rightElement}</View>
    </View>
  );
}
