import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";

const Privacy = () => {
  return (
    <SafeAreaView>
      <HeaderWithBackButton
        title="Plans"
        navigateToScreen="Profile"
        navigateToParams={"setting_main"}
      />
    </SafeAreaView>
  );
};

export default Privacy;
