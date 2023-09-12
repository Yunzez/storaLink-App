import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigators } from "./navigation/BottomTabNavigators";
import { GlobalContext, GlobalContextProvider } from "./context/GlobalProvider";
import Login from "./screens/Login";
import Test from "./screens/Test";
import Signup from "./screens/Signup";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ModalProvider } from "./context/ModalContext";
import SingleFolderView from "./screens/SingleFolderView";
import { NativeBaseProvider } from "native-base";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ShareContextProvider } from "./context/ShareContext";
import * as Linking from 'expo-linking';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { useShare } from "./hooks/useShare";
import useAsyncStorage from "./hooks/useAsyncStorage";
import SingleLinkView from "./screens/SingleLinkView";
import * as Font from 'expo-font';

const GlobalStack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();
type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <NativeBaseProvider>
      <NavigationContainer linking={linking}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
type FolderViewRouteParams = {
  name?: string;
};

const linking = {
  prefixes: ['com.storalink.app://'],
  config: {
    screens: {
      Home: 'home?sharedData=:sharedData',
    },
  },
};


export default function App() {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sharedExtraData, setSharedExtraData] = useState(null);
  const {navigator} = useContext(GlobalContext)
  const {getData} = useAsyncStorage()
  // ShareMenu.getInitialShare(handleShare);

  // useEffect(() => {
  //   async function loadFont() {
  //     await Font.loadAsync({
  //       'Helvetica-Bold': require('./assets/fonts/FreeSans.ttf'), // Replace with the actual path to your font file
  //     });
  //   }

  //   loadFont();
  // }, []);

  useShare(navigator)
  return (
    <Providers>
      <ShareContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
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
              options={({ route }) => {
                const params = route.params as FolderViewRouteParams;
                return {
                  headerTitle: params?.name ?? "Title",
                };
              }}
              name="SingleFolderView"
              component={SingleFolderView}
            />
            <GlobalStack.Screen
              options={({ route }) => {
                const params = route.params as FolderViewRouteParams;
                return {
                  headerTitle: params?.name ?? "Title",
                  headerShown: false
                };
              }}
              name="SingleLinkView"
              component={SingleLinkView}
            />
            <GlobalStack.Screen
              options={{
                headerShown: false,
              }}
              name="BottomNavigater"
              component={BottomTabNavigators}
            />
            {/* Add more Settings screens here */}
          </GlobalStack.Navigator>
        </GestureHandlerRootView>
      </ShareContextProvider>
    </Providers>
  );
}
