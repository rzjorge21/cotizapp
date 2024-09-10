import { View, Text, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import CustomTabBar from "../../components/CustomTabBar";

// const LegacyTabIcon = ({ icon, color, name, focused }: any) => {
//   return (
//     <View className="items-center justify-center gap-2">
//       <Feather name={icon} size={24} color={color} />
//       <Text
//         className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
//         style={{ color: color }}
//       >
//         {name}
//       </Text>
//     </View>
//   );
// };

const TabIcon = ({ icon, color, name, focused }: any) => {
  return (
    <View className="flex items-center justify-center w-12 h-12 rounded-full" style={{backgroundColor: color}}>
      <Feather name={icon} size={24} color={focused ? "black" : "#888989"} />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#d45f77",
          tabBarInactiveTintColor: "#19191A",
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#1E1F1F",
            borderRadius: 999,
            borderTopWidth: 0,
            bottom: 12,
            height: 54,
            paddingHorizontal: 2,
            width: 200,
            left: "50%",  
            transform: [{ translateX: -100 }],
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
    </>
  );
};

export default TabsLayout;
