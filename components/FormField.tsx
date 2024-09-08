import { View, Text, TouchableOpacity, Image, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

type Props = TextInputProps & {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles?: string;
};

export default function FormField({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-slate-200 w-full h-16 px-4
       bg-white rounded-2xl focus:border-lime-600 items-center
        flex-row">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
