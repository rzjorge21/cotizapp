import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../../../../components/CustomHeader";
import { Feather } from "@expo/vector-icons";
import { DoctorData } from "../../../../../constants/DataDummy";
import CustomButton from "../../../../../components/CustomButton";
import CustomTabs from "../../../../../components/CustomTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStat from "../../../../../components/CustomStats";

export default function Doctor() {
  const { doctorId = 0 } = useLocalSearchParams();
  const [DoctorObj, setDoctorObj] = useState<any>(null);
  const [tabContent, setTabContent] = useState<any>(null);

  useEffect(() => {
    const doctorObj = DoctorData.find((item) => item.id.toString() == doctorId);
    if (doctorObj) {
      setDoctorObj(doctorObj);
      setTabContent(doctorObj.details);
    }
  }, []);

  if (!DoctorObj) {
    return (
      <SafeAreaView className="bg-[#fff7fe] min-h-screen">
        <CustomHeader
          title="Doctor's Details"
          otherStyles="my-2 px-4"
          rightElement={
            <TouchableOpacity className="rounded-full w-11 h-11 border-aloha-200 bg-white border-2 flex justify-center items-center">
              <Feather name="bell" size={24} color="#d45f77" />
            </TouchableOpacity>
          }
        />
        <Text>Cargando Doctor</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#fff7fe] min-h-full py-2 relative">
      <CustomHeader
        title="Doctor's Details"
        otherStyles="my-2 px-4"
        rightElement={
          <TouchableOpacity className="rounded-full w-11 h-11 border-aloha-200 bg-white border-2 flex justify-center items-center">
            <Feather name="bell" size={24} color="#d45f77" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="px-4 mt-4">
        <View className="flex flex-row">
          <View className="min-w-[30%] aspect-square rounded-lg overflow-hidden bg-white flex justify-center items-center">
            <Image
              source={{
                uri: DoctorObj.imageUrl,
              }}
              className="w-[95%] h-[95%] rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="w-3/5 pl-2 justify-between">
            <Text className="text-xl font-psemibold">Dr. {DoctorObj.name}</Text>
            <Text className="text-md text-aloha-500">
              {DoctorObj.specialist}
            </Text>
            <Text className=" text-md text-gray-500">{DoctorObj.others}</Text>
          </View>
        </View>

        <View className="my-3"></View>

        <View className="flex-row justify-between mt-2">
          <CustomStat title="12 Years" subtitle="Experience" icon="archive" />
          <CustomStat title="1785+" subtitle="Patients" icon="users" />
          <CustomStat title="289" subtitle="Reviews" icon="star" />
        </View>

        <View className="mt-2">
          <CustomTabs details={tabContent}></CustomTabs>
        </View>
      </ScrollView>

      <View
        className="flex items-center flex-row justify-between px-4 absolute bottom-0 left-0 w-full bg-white border-t border-aloha-200"
        style={{ height: 80 }}
      >
        <View className="flex justify-between py-2">
          <Text className="text-aloha-500 text-lg font-bold">$25 USD</Text>
          <Text className="text-md text-gray-500">Appointment Fee</Text>
        </View>
        <CustomButton
          handlePress={() => {
            router.push({
              pathname: "/(tabs)/home/doctors/[doctorId]/appointment",
              params: { doctorId: DoctorObj.id },
            });
          }}
          containerStyles="min-w-[55%]"
          title="Get Appointment"
        />
      </View>
    </SafeAreaView>
  );
}
