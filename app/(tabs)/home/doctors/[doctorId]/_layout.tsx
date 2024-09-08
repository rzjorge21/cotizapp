import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function DoctorLayout() {
  return (
    <>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />

      <StatusBar backgroundColor="#fff7fe" style="dark" />
    </>
  );
}
