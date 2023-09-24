import { Center, Text, View } from "native-base";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AGeneralTextInput,
  NormalTitle,
  RetrunButton,
} from "../../theme/genericComponents";
import { Ionicons } from "@expo/vector-icons";
import { GlobalContext } from "../../context/GlobalProvider";
import { COLORS, SPACE } from "../../theme/constants";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";
import { SettingActionBtn, SettingButton, SettingSaveBtn } from "../Settings";
import StoraModal from "../../components/StoraModal";

const Account = () => {
  const defaultImage = require('../../assets/img/YellowIcon.png');
  console.log("Account component rendered");
  const { navigator, screenHeight, user, setUser } = useContext(GlobalContext);
  const [userNameVal, setUserNameVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const currUserName = user.username;
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [actionChildren, setActionChildren] = useState<React.ReactNode>(<></>);
  const [actionType, setActionType] = useState("");

  return (
    <SafeAreaView style={{ justifyContent: "center", flexDirection: "row" }}>
      <View width={"80%"}>
        <HeaderWithBackButton
          title="Account"
          navigateToScreen="Profile"
          navigateToParams={"setting_main"}
        />

        <View justifyContent={"center"} minHeight={screenHeight * 0.7}>
          <View flexDirection={'row'} justifyContent={'center'} marginBottom={10}>
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
          </View>
          
          <SettingActionBtn
            title={`Display Name: ${user.username} `}
            onPress={() => {
              setActionType("DisplayName");
              openModal();
            }}
          />
          <SettingActionBtn
            title={`Email: ${user.email} `}
            onPress={() => {
              setActionType("Email");
              openModal();
            }}
          />
          <SettingActionBtn
            title={`Change Password `}
            onPress={() => {
              setActionType("Password");
              openModal();
            }}
          />
          <TouchableOpacity
            style={{
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 30,
              marginVertical: 5,
              backgroundColor: COLORS.lowerWarning,
              elevation: 5, // Required for Android
              width: "100%",
              flexDirection: "row",
            }}
            onPress={() => {
              console.log("hi");
            }}
          >
            <Text style={{ color: COLORS.highWarning, fontSize: 17 }}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StoraModal trigger={showModal} setTrigger={setShowModal}>
        {actionType == "DisplayName" && (
          <View
            style={{
              height: 150,
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text>Change display name</Text>
            <View style={{ marginVertical: 4 }}>
              <AGeneralTextInput
                value={userNameVal}
                onChangeText={(text: string) => {
                  console.log("AGeneralTextInput onChangeText", text);
                  setUserNameVal(text);
                }}
              />
            </View>

            <SettingSaveBtn
              onClick={() => {
                setUser({ ...user, username: userNameVal });
                closeModal();
              }}
            />
          </View>
        )}

        {actionType == "Email" && (
          <View
            style={{
              height: 100,
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text>Change your email</Text>
            <SettingSaveBtn
              onClick={() => {
                console.log("hi");
                closeModal();
              }}
            />
          </View>
        )}
        {actionType == "Password" && (
          <View
            style={{
              height: 100,
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text>Change your password</Text>
            <SettingSaveBtn
              onClick={() => {
                console.log("hi");
                closeModal();
              }}
            />
          </View>
        )}
      </StoraModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: 100,
    height: 100,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderColor: COLORS.darkGrey,
    borderRadius: 50,
    borderWidth: 3,
  },
});

export default Account;
