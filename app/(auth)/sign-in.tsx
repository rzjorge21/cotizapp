import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';

const SignIn = () => {
  
  // const { setUser, setIsLogged } = useGlobalContext();
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      // await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
      <View className="w-full justify-center min-h-[85vh] h-full px-4 my-6">
          <Text className="text-4xl font-bold text-center">
            Cotiz<Text className="text-aloha-500">App</Text>
          </Text>

          <Text className="text-md text-gray-500 text-center font-semibold mt-5 font-psemibold">
            Login with your account
          </Text>

          <CustomInput
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Login"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-md text-gray-500 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-md font-psemibold text-aloha-500"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn