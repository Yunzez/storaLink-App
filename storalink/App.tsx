import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Files from "./screens/Files";
import Friends from "./screens/Friends";
import Test from "./screens/Test";
const BoxRoot = styled.Text`
  color: red;
`;

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const FilesStack = createNativeStackNavigator();
const FriendsStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

// Home Stack
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Test" component={Test} />
    </HomeStack.Navigator>
  );
}

// Files Stack
function FilesStackNavigator() {
  return (
    <FilesStack.Navigator>
      <FilesStack.Screen name="Files" component={Files} />
      {/* Add more Files screens here */}
    </FilesStack.Navigator>
  );
}

// Friends Stack
function FriendsStackNavigator() {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen name="Friends" component={Friends} />
      {/* Add more Friends screens here */}
    </FriendsStack.Navigator>
  );
}

// Settings Stack
function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
      {/* Add more Settings screens here */}
    </SettingsStack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Files" component={FilesStackNavigator} />
        <Tab.Screen name="Friends" component={FriendsStackNavigator} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
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
