import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Clients = () => {
  return (
    <SafeAreaView className="bg-[#f7f7ff] min-h-screen">
      <ScrollView className="p-4">
        <Text>CLient</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clients;
