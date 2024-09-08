import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type Props = {
  title: string;
  subtitle?: string;
  icon?: any;
}

export default function CustomStat({title, subtitle, icon}: Props) {
  return (
    <View
      className="flex border-aloha-200 border-[1px] 
          rounded-xl bg-white justify-center items-center 
          p-2 aspect-square w-[32%]"
    >
      {icon ? <Feather name={icon} size={20} color="#d45f77" /> : <></>}
      <Text className="font-bold mt-2">{title}</Text>
      {subtitle ? <Text className="text-xs text-gray-500">{subtitle}</Text> : <></>}
    </View>
  );
}
