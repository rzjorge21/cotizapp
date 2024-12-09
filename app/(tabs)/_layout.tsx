import { View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";
import { useAuthStore } from "../../store/authStore";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, focused }: any) => {
  return (
    <View
      className="flex items-center justify-center w-12 h-12 rounded-full self-center mt-4"
      style={{ backgroundColor: color }}
    >
      <Feather name={icon} size={24} color={focused ? "black" : "#888989"} />
    </View>
  );
};

const TabsLayout = () => {
  const { isLoggedIn } = useAuthStore();

  // Todo el Tab está protegido
  if (!isLoggedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#d45f77",
          tabBarInactiveTintColor: "#19191A",
          tabBarStyle: {
            // position: "absolute",
            // left: "50%",
            // transform: [{ translateX: -100 }],
            backgroundColor: "#1E1F1F",
            borderRadius: 999,
            bottom: 12,
            height: 56,
            width: 210,
            paddingHorizontal: 2,
            alignSelf: "center",
          },
        }}
        tabBar={(props) => {
          return <CustomTabBar {...props} />;
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"home"}
                color={color}
                // name={"Home"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="clients"
          options={{
            title: "Clients",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"user"}
                color={color}
                // name={"Clients"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"box"}
                color={color}
                // name={"Producs"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"settings"}
                color={color}
                // name={"Settings"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* BARRA DE ESTADO */}
      <StatusBar backgroundColor="#f7f7ff" style="dark" />
    </>
  );
};

export default TabsLayout;
