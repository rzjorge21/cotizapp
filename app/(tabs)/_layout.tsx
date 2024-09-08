import { View, Text, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import CustomTabBar from "../../components/CustomTabBar";

const TabIcon = ({ icon, color, name, focused }: any) => {
  return (
    <View className="items-center justify-center gap-2">
      <Feather name={icon} size={24} color={color} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{color: color}}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#fff",
            height: 60
          }
        }}
        tabBar={(props) => {
          return <CustomTabBar {...props}/>
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
                name={"Home"}
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
                name={"Clients"}
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
                name={"Producs"}
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
                name={"Settings"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
