import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
  otherStyles?: string;
  children?: React.ReactNode;
};

export default function Section({
  title,
  showSeeAll = true,
  onSeeAll,
  otherStyles,
  children,
}: Props) {
  return (
    <>
      <View className={`flex-row justify-between items-center ${otherStyles}`}>
        <Text className="text-lg font-pbold">{title}</Text>
        {showSeeAll ? (
          <TouchableOpacity onPress={onSeeAll}>
            <Text className="text-sm font-psemibold text-aloha-500">
              See All
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      {children}
    </>
  );
}
