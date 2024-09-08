import React, { createContext, useContext, useState } from "react";

const CustomTabBarContext = createContext({
  isTabBarVisible: true,
  hideTabBar: () => {},
  showTabBar: () => {},
});

export const useCustomTabBar = () => {
  return useContext(CustomTabBarContext);
};

export const CustomTabBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const value = {
    isTabBarVisible,
    hideTabBar: () => setIsTabBarVisible(false),
    showTabBar: () => setIsTabBarVisible(true),
  };

  return (
    <CustomTabBarContext.Provider value={value}>
      {children}
    </CustomTabBarContext.Provider>
  );
};
