import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function DoctorLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}