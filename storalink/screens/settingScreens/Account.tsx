import { Center, Text, View } from "native-base";
import {TouchableOpacity} from "react-native";
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
  const { navigator, screenHeight, user, setUser } = useContext(GlobalContext);
  const [userNameVal, setUserNameVal] = useState(user.username)
  return (
    <SafeAreaView style={{ justifyContent: "center", flexDirection: "row" }}>
      <View width={"80%"}>
        <HeaderWithBackButton
          title="Account"
          navigateToScreen="Settings"
          navigateToParams={"setting_main"}
        />

        <View justifyContent={"center"} minHeight={screenHeight * 0.7}>
          <SettingActionBtn
            title={"Display Image:"}
            onPress={() => {
              console.log("hi");
            }}
            children={
              <View
                style={{
                  height: 100,
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text>Change display image</Text>

                <SettingSaveBtn
                  onClick={() => {
                    console.log("hi");
                  }}
                />
              </View>
            }
          />
          <SettingActionBtn
            title={`Display Name: ${user.username} `}
            onPress={() => {
                
            }}
            children={
              <View
                style={{
                  height: 150,
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text>Change display name</Text>
                <View style={{ marginVertical: 4 }}>
                  <AGeneralTextInput value={userNameVal} onChangeText={(text: string) => {setUserNameVal(text)}}/>
                </View>

                <SettingSaveBtn
                  onClick={() => {
                    setUser({...user, username: userNameVal })
                  }}
                />
              </View>
            }
          />
          <SettingActionBtn
            title={`Email: ${user.email} `}
            onPress={() => {
              console.log("hi");
            }}
            children={
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
                  }}
                />
              </View>
            }
          />
          <SettingActionBtn
            title={`Change Password `}
            onPress={() => {
              console.log("hi");
            }}
            children={
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
                  }}
                />
              </View>
            }
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
    </SafeAreaView>
  );
};

export default Account;
