import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";
import { Switch, View } from "native-base";
import { ToggleActionBtn } from "../Settings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNotification } from "../../hooks/useNotification";
import * as Notifications from "expo-notifications";
import { GlobalContext } from "../../context/GlobalProvider";

const Notification = () => {
  const { sendNotification } = useNotification();
  const { expoPushToken } = useContext(GlobalContext);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
    >
      <View width={"80%"}>
        <HeaderWithBackButton
          title="Notifications"
          navigateToScreen="Settings"
          navigateToParams={"setting_main"}
        />
        {/* <TouchableOpacity
          onPress={async () => {
            await sendNotification({title: 'Storalink', body: 'You have turned on notification :)'})
          }}
        >
          <Text>test notification</Text>
        </TouchableOpacity> */}

        <View
          style={{ height: "100%", flexDirection: "column", marginTop: 15 }}
        >
          <ToggleActionBtn title={"Push Notification"} onToggle={(value: boolean) => {
            if(value) {
               sendNotification({title: 'Storalink', body: 'You have turned on notification :)'})
            } else {
              sendNotification({title: 'Storalink', body: 'You have turned off notification :)'})
            }
          }}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
