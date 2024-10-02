import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUIStore } from "@/store/uiStore";

export default function DoctorLayout() {
  const {showTabBar, hideTabBar} = useUIStore()
  
  // Ocultar tab bar al crearse el componente
  useEffect(() => {
    hideTabBar();
    return () => {
      showTabBar();
    }; // Mostrar tab bar al destruirse el componente
  }, []);

  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
