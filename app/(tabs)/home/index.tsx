import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import Section from "../../../components/Section";
import { DepartmentData, DoctorData } from "../../../constants/DataDummy";
import DoctorCard from "../../../components/DoctorCard";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";

const Header = () => (
  <View className="flex flex-row items-center my-2">
    <Image
      source={{
        uri: "https://img.freepik.com/foto-gratis/retrato-hombre-reir_23-2148859448.jpg",
      }}
      className="w-12 h-12 rounded-full"
      resizeMode="contain"
    />
    <View className="px-4 flex-1">
      <Text className="font-semibold">Hi David!</Text>
      <Text className="text-gray-500">Find a doctor easily</Text>
    </View>
    <View className="ml-auto">
      <Pressable className="rounded-full w-12 h-12 border-blue-200 bg-white border-2 flex justify-center items-center">
        <Feather name="bell" size={24} color="#3b82f6" />
      </Pressable>
    </View>
  </View>
);

const Home = () => {
  const [form, setForm] = useState({ query: "" });

  return (
    <SafeAreaView className="bg-[#f7f7ff] min-h-screen">
      <ScrollView className="p-4">
        <Header />

        <CustomInput
          handleChangeText={(e) => setForm({ ...form, query: e })}
          value={form.query}
          icon={<Feather name="search" size={24} color="#3b82f6" />}
          placeholder="Search Doctors"
          otherStyles="my-2"
        />

        <Section title="Departments" otherStyles="my-4">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {DepartmentData.map((item: any, idx) => (
              <TouchableOpacity className="mr-4 items-center" key={idx}>
                <View className="justify-center items-center w-16 h-16 bg-blue-500 rounded-full">
                  <Feather name={item.icon} size={35} color="white" />
                </View>
                <Text className="text-center mt-2">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Section>

        <View className="my-4"></View>

        <Section title="Popular Doctors" otherStyles="mb-4" onSeeAll={()=>{router.push("/home/doctors");}}>
          <View className="flex flex-wrap items-start justify-between flex-row">
            {DoctorData.slice(0,6).map((item, idx) => (
              <DoctorCard
                onPressCard={()=>{
                  router.push({pathname: '/(tabs)/home/doctors/[doctorId]', params: {doctorId: item.id}})
                }}
                key={idx}
                name={item.name}
                imageUrl={item.imageUrl}
                specialist={item.specialist}
                others={item.others}
                rating={item.rating}
                reviews={item.reviews}
              />
            ))}
          </View>
        </Section>

        <CustomButton
          handlePress={() => {
          }}
          title="Get Appointment"
        />

        <View className="my-8"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
