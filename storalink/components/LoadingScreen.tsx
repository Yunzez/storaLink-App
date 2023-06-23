import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

interface LoadingScreenProps {
    loadingText?:string
}
const LoadingScreen = (props: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>{props.loadingText?? ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
