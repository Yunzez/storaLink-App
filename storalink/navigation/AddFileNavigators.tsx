import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Test from "../screens/Test";
import AddFile from "../screens/AddFile";
import AddFolders from "../screens/addFileScreens/AddFolders";
import AddLinks from "../screens/addFileScreens/AddLinks";

const Stack = createNativeStackNavigator();

export default function AddFilesNavigators() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="add_main"
        component={AddFile}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="add_new_folder"
        component={AddFolders}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="add_new_link"
        component={AddLinks}
      />
    </Stack.Navigator>
  );
}
