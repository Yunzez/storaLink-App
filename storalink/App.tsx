import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigators } from "./navigation/BottomTabNavigators";
import { GlobalContextProvider } from "./context/GlobalProvider";
import Login from "./screens/Login";
import Test from "./screens/Test";
const BoxRoot = styled.Text`
  color: red;
`;
const GlobalStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <GlobalStack.Navigator>
          <GlobalStack.Screen name="Login" component={Login} />
          <GlobalStack.Screen name="Test" component={Test} />
          <GlobalStack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={BottomTabNavigators}
          />
          {/* Add more Settings screens here */}
        </GlobalStack.Navigator>
      </GlobalContextProvider>
    </NavigationContainer>
  );
}
