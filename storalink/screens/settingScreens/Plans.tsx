import React from "react";
import { SafeAreaView, Text } from "react-native";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";

const Plans = () => {
  return (
    <SafeAreaView>
      <HeaderWithBackButton
        title="Plans"
        navigateToScreen="Settings"
        navigateToParams={"setting_main"}
      />
    </SafeAreaView>
  );
};

export default Plans;
