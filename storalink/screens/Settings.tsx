import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../context/GlobalProvider";
import { COLORS } from "../theme/constants";
import UserAvatorWidget from "../components/UserAvatorWidget";

export const Settings = () => {
  const { navigator, user } = useContext(GlobalContext);

  const handleButtonPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <UserAvatorWidget/>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigator.navigate("Login")}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Upgrade Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Appearance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text>Privacy & Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  avatarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "#FFF",
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5, // Required for Android
  },
  avatarText: {
    fontSize: 18,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: COLORS.lightGrey,
    elevation: 5, // Required for Android
    width: "100%",
  },
});

export default Settings;
