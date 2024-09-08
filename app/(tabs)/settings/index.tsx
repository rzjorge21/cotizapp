import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView className="bg-[#f7f7ff] min-h-screen">
      <ScrollView className="p-4">
        <Text>Settings</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
