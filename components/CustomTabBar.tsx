import React from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useUIStore } from "../store/uiStore";

const CustomTabBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
  const { isTabBarVisible } = useUIStore()

  if (!isTabBarVisible) {
    return null;
  }

  return <BottomTabBar {...props}/>;
};

export default CustomTabBar;
