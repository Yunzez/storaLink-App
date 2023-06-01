import React from 'react'
import styled from "styled-components/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Files from "../screens/Files";
import Friends from "../screens/Friends";
import Test from "../screens/Test";
import HomeNavigators from './HomeNavigators';
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
        <Tab.Screen name="Home" component={HomeNavigators} />
        <Tab.Screen name="Files" component={Files} />
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
  )
  
}

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

  export default BottomTabNavigators