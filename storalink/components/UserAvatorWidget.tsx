import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../theme/constants";
import Pencil from "../assets/svgComponents/Pencil";
import { GlobalContext } from "../context/GlobalProvider";

const UserAvatorWidget = () => {
  const { user, navigator } = useContext(GlobalContext);
  const defaultImage = require('../assets/img/YellowIcon.png');
console.log('')
  return (
    <View style={styles.avatarContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity style={styles.avatarImage}>
          
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
            source={
              user.profileImg
                ? user.profileImg 
                : defaultImage
            }
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.avatarTextName}>{user.username} </Text>
          <Text style={styles.avatarTextEmail}>{user.email} </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigator.navigate("account");
        }}
      >
        <Pencil width="30" height="30" color={COLORS.themeYellow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
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
  avatarTextName: {
    fontSize: 22,
    color: COLORS.themeYellow,
  },
  avatarTextEmail: {
    fontSize: 16,
    color: COLORS.darkGrey,
  },
  avatarImage: {
    width: 60,
    height: 60,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderColor: COLORS.darkGrey,
    borderRadius: 50,
    borderWidth: 3,
  },
});
export default UserAvatorWidget;
