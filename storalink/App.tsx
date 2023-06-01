import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
const BoxRoot = styled.Text`
  color: red;
`;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: 20, // you can adjust this value as per your need
            left: 20,
            right: 20,
            backgroundColor: '#ffffff',
            borderRadius: 30,
            height: 60,
            ...styles.shadow
          }
        }}
      >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}


const styles = {
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
};
