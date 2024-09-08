import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

type DateItem = {
  number: number;
  day: string;
};

type Props = {
  dates: DateItem[];
  onSelectDate: (date: number) => void;
  selectedDate: number;
  containerStyles?: string;
};

const DateSelector = ({
  dates,
  onSelectDate,
  selectedDate,
  containerStyles,
}: Props) => {
  return (
    <View className={`py-3 border-b border-b-aloha-200 ${containerStyles}`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-3"
      >
        {dates.map((date, index) => {
          const isSelected = selectedDate === date.number;

          return (
            <TouchableOpacity
              key={index}
              className={`items-center justify-center mx-1 w-14 h-20 border rounded-full ${
                isSelected
                  ? "border-aloha-500 bg-aloha-500"
                  : "border-aloha-200 bg-white"
              }`}
              onPress={() => onSelectDate(date.number)}
            >
              <Text
                className={`text-lg font-bold ${
                  isSelected ? "text-white" : ""
                }`}
              >
                {date.number}
              </Text>
              <Text
                className={`text-sm ${
                  isSelected ? "text-white" : "text-gray-500"
                }`}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DateSelector;
