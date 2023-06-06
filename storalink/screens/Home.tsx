import React from "react";
import { Button, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Test from "./Test";

export const Home = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home!</Text>
    <Button
      title="Go to Test"
      onPress={() => navigation.navigate('Test_home')}
    />
    <Button
      title="Back to Login"
      onPress={() => navigation.navigate('Login')}
    />
  </SafeAreaView>
  );
};

export default Home;
