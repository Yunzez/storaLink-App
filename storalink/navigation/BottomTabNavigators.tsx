import React from "react";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Files from "../screens/Files";
import Friends from "../screens/Friends";
import Test from "../screens/Test";
import HomeNavigators from "./HomeNavigators";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/constants";
export const BottomTabNavigators = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20, // you can adjust this value as per your need
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 30,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigators}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? size * 1.2 : size}
              color={focused ? COLORS.themeYellow : COLORS.darkGrey}
            />
          ),
        }}
      />
      <Tab.Screen name="Files" component={Files}  options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "document" : "document-outline"}
              size={focused ? size * 1.2 : size}
              color={focused ? COLORS.themeYellow : COLORS.darkGrey}
            />
          ),
        }}/>
      <Tab.Screen name="Friends" component={Friends}  options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={focused ? size * 1.2 : size}
              color={focused ? COLORS.themeYellow : COLORS.darkGrey}
            />
          ),
        }}/>
      <Tab.Screen name="Settings" component={Settings}  options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={focused ? size * 1.2 : size}
              color={focused ? COLORS.themeYellow : COLORS.darkGrey}
            />
          ),
        }}/>
    </Tab.Navigator>
  );
};

const styles = {
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
};

export default BottomTabNavigators;
