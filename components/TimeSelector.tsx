import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
type Section = {
  label: string;
  times: string[];
  icon: any;
}

type Props = {
  sections: Section[];
  onSelectTime: (time: string) => void;
  selectedTime: string
}

const TimeSelector = ({ sections, onSelectTime, selectedTime }: Props) => {
  return (
    <View>
      {sections.map(({ label, times, icon }) => (
        <View key={`${label}-${times}`} className="mb-2">
          <View className="flex-row items-center my-2">
            <Feather name={icon} size={20} color="#3b82f6" />
            <Text className="text-lg font-bold mx-2 ">{label}</Text>
          </View>

          <View className="flex flex-row flex-wrap">
            {times.map((time: string, index: number) => (
              <TouchableOpacity
                key={index}
                className={`w-[30%] mx-1 my-1 p-2 py-3 
                  rounded-xl bg-white border border-blue-200 
                  items-center justify-center 
                  ${selectedTime === `${label}-${time}` ? 'bg-blue-500' : ''}`}
                onPress={() => onSelectTime(`${label}-${time}`)}
              >
                <Text className={`text-sm ${selectedTime === `${label}-${time}` ? 'text-white' : ''}`}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default TimeSelector;
