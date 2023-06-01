import React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator, StackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create a stack navigator
// Define your stack navigator's screen names and params
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
};


export const HomeScreen = ({navigation}: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        title="Go to Test"
        onPress={() => navigation.navigate('Test')}
      />
    </View>
  )
}


export default HomeScreen