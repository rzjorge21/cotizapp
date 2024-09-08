import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  rating: number;
  reviews: number;
  otherStyles?: string;
};

export default function Rating({ rating, reviews, otherStyles }: Props) {
  return (
    <View className={`${otherStyles}`}>
      <View className="flex flex-row items-center">
        <AntDesign name={rating >= 1 ? "star" : "staro"} size={14} color="orange" />
        <AntDesign name={rating >= 2 ? "star" : "staro"} size={14} color="orange" />
        <AntDesign name={rating >= 3 ? "star" : "staro"} size={14} color="orange" />
        <AntDesign name={rating >= 4 ? "star" : "staro"} size={14} color="orange" />
        <AntDesign name={rating >= 5 ? "star" : "staro"} size={14} color="orange" />
        <Text className="ml-2">{rating}</Text>
      </View>
      <Text>({reviews} Reviews)</Text>
    </View>
  );
}
