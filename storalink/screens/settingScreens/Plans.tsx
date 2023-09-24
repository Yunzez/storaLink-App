import React from "react";
import { SafeAreaView, Text } from "react-native";
import { View } from "native-base";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";

const Plans = () => {
  return (
    <SafeAreaView>
      <View width={"80%"}>
        <HeaderWithBackButton
          title="Plans"
          navigateToScreen="Profile"
          navigateToParams={"setting_main"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Plans;
