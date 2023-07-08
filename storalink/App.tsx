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
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ModalProvider } from "./context/ModalContext";
import SingleFolderView from "./screens/SingleFolderView";
import { NativeBaseProvider } from "native-base";
const BoxRoot = styled.Text`
  color: red;
`;
const GlobalStack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();
type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <NativeBaseProvider>
      <ModalProvider>
        <NavigationContainer>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </NavigationContainer>
      </ModalProvider>
    </NativeBaseProvider>
  );
};

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
            headerTitle: "test",
          }}
          name="SingleFolderView"
          component={SingleFolderView}
        />
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
