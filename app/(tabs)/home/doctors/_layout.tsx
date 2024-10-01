import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUIStore } from "../../../../store/uiStore";

export default function DoctorLayout() {
  const {showTabBar, hideTabBar} = useUIStore()

  useEffect(() => {
    hideTabBar();

    return () => { showTabBar() };
  }, []);
  return (
    <>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />

      <StatusBar backgroundColor="#fff7fe" style="dark" />
    </>
  );
}
