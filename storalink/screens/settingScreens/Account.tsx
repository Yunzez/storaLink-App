import { Center, Text, View } from "native-base";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NormalTitle, RetrunButton } from "../../theme/genericComponents";
import { Ionicons } from "@expo/vector-icons";
import { GlobalContext } from "../../context/GlobalProvider";
import { COLORS } from "../../theme/constants";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";
import { SettingButton } from "../Settings";
import { TouchableOpacity } from "react-native-gesture-handler";
const Account = () => {
  const { navigator, screenHeight } = useContext(GlobalContext);
  return (
    <SafeAreaView style={{ justifyContent: "center", flexDirection: "row" }}>
      <View width={"80%"}>
        <HeaderWithBackButton
          title="Account"
          navigateToScreen="Settings"
          navigateToParams={"setting_main"}
        />
        <View justifyContent={"center"} minHeight={screenHeight * 0.7}>
          <SettingButton
            title={"Display Image: "}
            onPress={() => {
              console.log("hi");
            }}
          />
          <SettingButton
            title={"Display Name:  "}
            onPress={() => {
              console.log("hi");
            }}
          />
          <SettingButton
            title={"Email "}
            onPress={() => {
              console.log("hi");
            }}
          />
          <SettingButton
            title={"Password: "}
            onPress={() => {
              console.log("hi");
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
            <Text style={{ color: COLORS.highWarning, fontSize: 17}}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
