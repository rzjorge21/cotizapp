import { Text, ScrollView, Image, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../store/authStore";
import { Feather } from "@expo/vector-icons";

const Settings = () => {
  const { logout } = useAuthStore();
  return (
    <SafeAreaView className="bg-[#f7f7ff] min-h-screen">
      <ScrollView className="p-4">
        <View className="justify-center items-center h-48">
          <Image
            source={{
              uri: "https://img.freepik.com/foto-gratis/retrato-hombre-reir_23-2148859448.jpg",
            }}
            className="w-24 h-24 rounded-full bg-red-200"
            resizeMode="contain"
          />
          <Text className="text-2xl mt-4">Hi David!</Text>
        </View>
        
        <View>
          <TouchableOpacity className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center">
              <Feather name="user" size={24} color="#d45f77" />
              <Text className="ml-4">Edit Profile</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#d45f77" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center">
              <Feather name="bell" size={24} color="#d45f77" />
              <Text className="ml-4">Notification</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#d45f77" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center">
              <Feather name="log-out" size={24} color="#d45f77" />
              <Text className="ml-4">Logout</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#d45f77" />
          </TouchableOpacity>
        </View>

        {/* <CustomButton title="Logout" handlePress={logout} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
