import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigators } from "./navigation/BottomTabNavigators";
import { GlobalContextProvider } from "./context/GlobalProvider";
import Login from "./screens/Login";
import Test from "./screens/Test";
import Signup from "./screens/Signup";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ModalProvider } from "./context/ModalContext";

const BoxRoot = styled.Text`
  color: red;
`;
const GlobalStack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();
type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({children}: ProvidersProps) => {
  return (
      <NavigationContainer>
          <GlobalContextProvider>
              <ModalProvider>
                  {children}
              </ModalProvider>
          </GlobalContextProvider>
      </NavigationContainer>
  );
}

export default function App() {
  return (
      <Providers>
          <GlobalStack.Navigator>
              <GlobalStack.Screen 
                  options={{
                      headerShown: false,
                  }}
                  name="Login" 
                  component={Login} 
              />
              <GlobalStack.Screen name="Signup" component={Signup} />
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
      </Providers>
  );
}
