import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <View
          className="w-full justify-center min-h-[85vh] h-full px-4 my-6"
        >
          <Text className='text-4xl text-center text-lime-600'>CotizApp</Text>

          <Text className="text-2xl text-center font-semibold mt-10 font-psemibold">
            Let's Connect With Us!
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
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
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-lime-600"
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