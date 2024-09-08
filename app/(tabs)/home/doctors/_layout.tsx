import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCustomTabBar } from "../../../../context/CustomTabBarContext";

export default function DoctorLayout() {
  const { hideTabBar, showTabBar } = useCustomTabBar();

  useEffect(() => {
    hideTabBar();

    return () => {
      showTabBar();
    };
  }, []);
  return (
    <>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />

      <StatusBar backgroundColor="#f7f7ff" style="dark" />
    </>
  );
}
