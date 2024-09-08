import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Rating from "./Rating";

type Props = {
  name: string;
  onPressCard?: () => void;
  imageUrl: string;
  specialist: string;
  others: string;
  rating: number;
  reviews: number;
  otherStyles?: string;
};

export default function DoctorCard({
  name,
  onPressCard,
  imageUrl,
  specialist,
  others,
  rating,
  reviews,
  otherStyles,
}: Props) {
  return (
    <TouchableOpacity className={`bg-white p-2 rounded-lg w-[48%] my-2 min-h-[275px] ${otherStyles}`}
    activeOpacity={0.7}
    onPress={onPressCard}>
      <View className="relative">
        <Image
          source={{
            uri: imageUrl,
          }}
          className="w-full min-h-[150px]"
          resizeMode="cover"
          style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <TouchableOpacity className="absolute top-2 right-2 rounded-full w-8 h-8 bg-aloha-500 flex justify-center items-center">
          <Feather name="heart" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="font-psemibold">Dr. {name}</Text>
      <Text className="text-aloha-500 text-xs">{specialist}</Text>
      <Text className="text-gray-500 text-xs">{others}</Text>
      <Rating rating={rating} reviews={reviews} />
    </TouchableOpacity>
  );
}
