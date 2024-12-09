import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUIStore } from "@/store/uiStore";

export default function QuotLayout() {
  const {showTabBar, hideTabBar} = useUIStore()
  
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
