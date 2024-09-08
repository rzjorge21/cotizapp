import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function FloatingButton() {
  return (
    <TouchableOpacity 
    className="absolute right-4 bottom-10 h-[75px] w-[75px] rounded-full bg-lime-400 z-10
    flex justify-center items-center">
      <Text className="text-2xl">+</Text>
    </TouchableOpacity>
  );
}
