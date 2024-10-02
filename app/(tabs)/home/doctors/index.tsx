import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import DoctorCard from "../../../../components/DoctorCard";
import { Feather } from "@expo/vector-icons";
import CustomHeader from "../../../../components/CustomHeader";
import { router } from "expo-router";
import { DoctorData } from "../../../../constants/DataDummy";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Doctors() {
  return (
    <SafeAreaView className="bg-[#fff7fe] min-h-screen py-2">
      <CustomHeader
        title="All Doctors"
        otherStyles="my-2 px-4"
        rightElement={
          <TouchableOpacity className="rounded-full w-11 h-11 border-aloha-200 bg-white border-2 flex justify-center items-center">
            <Feather name="bell" size={24} color="#d45f77" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="px-4">
        <View className="flex flex-wrap items-start justify-between flex-row py-4">
          {DoctorData.map((item, idx) => (
              <DoctorCard
                key={idx}
                onPressCard={()=>{
                    router.push({pathname: '/(tabs)/home/doctors/[doctorId]', params:{ doctorId: item.id}});
                }}
                name={item.name}
                imageUrl={item.imageUrl}
                specialist={item.specialist}
                others={item.others}
                rating={item.rating}
                reviews={item.reviews}
              />
          ))}
        </View>

        <View className="my-2"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
