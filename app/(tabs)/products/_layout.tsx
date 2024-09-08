import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProductLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="products" options={{ headerShown: false }} /> */}
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#f7f7ff" style="dark" />
    </>
  );
}
