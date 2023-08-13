import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Test from "../screens/Test";
import Settings from "../screens/Settings";
import Account from "../screens/settingScreens/Account";
import Appearance from "../screens/settingScreens/Appearance";
import Notification from "../screens/settingScreens/Notification";
import Plans from "../screens/settingScreens/Plans";

const Stack = createNativeStackNavigator();

export default function SettingNavigators() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="setting_main"
        component={Settings}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: true,
          headerTitle: "Account", // or null to hide the screen title in the header
        }}
        name="account"
        component={Account}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: true,
          headerTitle: "Appearance", // or null to hide the screen title in the header
        }}
        name="appearance"
        component={Appearance}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: true,
          headerTitle: "Notification", // or null to hide the screen title in the header
        }}
        name="notification"
        component={Notification}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: true,
          headerTitle: "Plans", // or null to hide the screen title in the header
        }}
        name="plans"
        component={Plans}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: "Privacy ", // or null to hide the screen title in the header
        }}
        name="privacy"
        component={Test}
      />
    </Stack.Navigator>
  );
}
