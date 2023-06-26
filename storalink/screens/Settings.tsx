import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../context/GlobalProvider";
export const Settings = () => {
  const { navigator, user } = useContext(GlobalContext);

  const handlePasswordChange = () => {

  }

  const handleEditProfile = () => {

  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Hi {user.username}</Text>
        <Text style={styles.userInfoText}>Email: {user.email}</Text>
        <Text style={styles.userInfoText}>Birthday: {user.dob}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Log out" onPress={() => navigator.navigate('Login')} />
      </View>
      <View style={styles.additionalButtonsContainer}>
        <Button title="Change Password" onPress={() => handlePasswordChange()} />
        <Button title="Edit Profile" onPress={() => handleEditProfile()} />
        {/* Add more buttons here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    marginBottom: 30,
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  additionalButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default Settings;
