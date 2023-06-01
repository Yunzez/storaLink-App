import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Test from "../screens/Test";

const BoxRoot = styled.Text`
  color: red;
`;
const Stack = createNativeStackNavigator();

export default function HomeNavigators() {
  return (

        <Stack.Navigator>
          <Stack.Screen name="Home_Main" component={Home} />
          <Stack.Screen name="Test" component={Test} />
          {/* Add more Settings screens here */}
        </Stack.Navigator>

  );
}

