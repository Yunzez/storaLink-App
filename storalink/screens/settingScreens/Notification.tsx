import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";

const Notification = () => {
  return (
    <SafeAreaView>
      <HeaderWithBackButton
        title="Notifications"
        navigateToScreen="Settings"
        navigateToParams={"setting_main"}
      />
    </SafeAreaView>
  );
};

export default Notification;
