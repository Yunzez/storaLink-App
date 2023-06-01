import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Test from './Test';
// Create a stack navigator
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={Test} />
        {/* Add more screens in the Home tab here */}
      </Stack.Navigator>
    );
  }

export default HomeStack