import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text
} from "react-native";
import React, { useState } from "react";

interface TabDetails {
  label: string;
  content: string | JSX.Element;  // El contenido puede ser texto o un componente JSX para mayor flexibilidad.
}

interface TabsProps {
  details: TabDetails[];
}

const Tabs = ({ details }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const animatedValue = new Animated.Value(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    Animated.timing(animatedValue, {
      toValue: index,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const tabWidth = details.length > 3 ? (Dimensions.get('window').width) / details.length : (Dimensions.get('window').width - 32) / details.length;
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.tabContainer,
          {
            width: details.length * 100 < (Dimensions.get('window').width - 32)
              ? '100%'
              : undefined,
          },
        ]}
      >
        {details.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, { width: tabWidth}]}
            onPress={() => handleTabPress(index)}
          >
            <Animated.Text
              style={[
                styles.tabText,
                {
                  color: activeTab === index ? '#3b82f6' : '#6b7280',
                  marginBottom: activeTab === index ? 0 : 10
                },
              ]}
            >
              {tab.label}
            </Animated.Text>
            {activeTab === index && (
              <Animated.View style={[styles.activeTabIndicator]} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.contentContainer}>
        {details.map((tab, index) => (
          <View key={index} style={{ display: activeTab === index ? 'flex' : 'none' }}>
            {typeof tab.content === 'string' ? (
              <Text style={styles.tabContentText}>{tab.content}</Text>
            ) : (
              tab.content // Permite pasar un componente JSX como contenido
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    marginTop: 10
  },
  activeTabIndicator: {
    height: 2,
    backgroundColor: '#3b82f6',
    marginTop: 10,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 12,
  },
  tabContentText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default Tabs;