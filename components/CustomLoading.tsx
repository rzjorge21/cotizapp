import { View, Modal, ActivityIndicator } from "react-native";
import React from "react";

type Props = {
  visible: boolean
}

export default function CustomLoading({ visible }: Props) {
  return (
    <Modal
      className="z-50"
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View className="h-full justify-center items-center bg-neutral-500/[.5]">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    </Modal>
  );
}
