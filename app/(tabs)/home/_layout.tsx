import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[orderId]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
