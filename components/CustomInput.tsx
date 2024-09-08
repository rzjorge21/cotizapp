import { View, Text, TextInputProps, TextInput } from 'react-native'
import React from 'react'

type Props = TextInputProps & {
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles?: string;
  icon?: React.ReactNode
};

export default function CustomInput({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  icon,
  ...props
}: Props) {
  return (
    <View
      className={`border-blue-200 border-2 w-full h-12 px-4 rounded-lg focus:border-blue-500 items-center
        flex-row ${otherStyles}`}
        >
          <TextInput
            className="flex-1 text-black"
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            placeholderTextColor={"#6b7280"}
            {...props}
          />
          {icon ? icon : <></>}
    </View>
  )
}