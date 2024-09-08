import { Pressable, ScrollView, View } from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../../../../components/CustomHeader";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateSelector from "../../../../../components/DateSelector";
import CustomButton from "../../../../../components/CustomButton";
import TimeSelector from "../../../../../components/TimeSelector";
import { ShowInfo, ShowSuccess } from "../../../../../utils/toast";

const dates = [
  { number: 26, day: "Mon" },
  { number: 27, day: "Tue" },
  { number: 28, day: "Wed" },
  { number: 29, day: "Thu" },
  { number: 30, day: "Fri" },
  { number: 31, day: "Sat" },
  { number: 1, day: "Sun" },
  { number: 2, day: "Mon" },
  { number: 3, day: "Tue" },
  { number: 4, day: "Wed" },
  { number: 5, day: "Thu" },
  { number: 6, day: "Fri" },
];

const sections = [
  {
    label: "Morning",
    times: ["9:00am", "9:30am", "10:00am", "10:30am"],
    icon: 'sunrise'
  },
  {
    label: "Noon",
    times: ["1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm"],
    icon: 'sun'
  },
  {
    label: "Night",
    times: ["6:00pm", "6:30pm", "7:00pm"],
    icon: 'moon'
  },
];

export default function Appointment() {
  const { doctorId = 0 } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  const handleSelectDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
  };

  const onConfirm = () => {
    if(selectedDate == 0 || selectedTime == ''){
      ShowInfo('Choose your appointment date and hour');
      return;
    }
    ShowSuccess('Your appointment was successfully separated')
    router.navigate('/(tabs)/home')
  }

  return (
    <SafeAreaView className="bg-[#fff7fe] min-h-full block">
      <CustomHeader
        title="Select Time Slots"
        otherStyles="my-2 px-4"
        rightElement={
          <Pressable className="rounded-full w-11 h-11 border-aloha-200 bg-white border-2 flex justify-center items-center">
            <Feather name="bell" size={24} color="#d45f77" />
          </Pressable>
        }
      />

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <ScrollView className="px-4 mt-4">
        <TimeSelector
          sections={sections}
          selectedTime={selectedTime}
          onSelectTime={handleSelectTime}
        />
      </ScrollView>

      <View
        className="flex items-center flex-row px-4 absolute bottom-0 left-0 w-full bg-white border-t border-aloha-200"
        style={{ height: 80 }}
      >
        <CustomButton containerStyles="w-full" handlePress={onConfirm} title="Confirm" />
      </View>
    </SafeAreaView>
  );
}
