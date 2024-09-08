import React from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useCustomTabBar } from "../context/CustomTabBarContext";

const CustomTabBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
  const { isTabBarVisible } = useCustomTabBar();

  if (!isTabBarVisible) {
    return null;
  }

  return <BottomTabBar {...props} />;
};

export default CustomTabBar;
