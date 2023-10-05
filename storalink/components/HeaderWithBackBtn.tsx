import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReturnButton } from "../theme/genericComponents";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";

type HeaderWithBackButtonProps = {
  navigateToScreen?: string;
  navigateToParams?: string;
  navigateOptions?: any
  title?: string;
};

const HeaderWithBackButton: React.FC<HeaderWithBackButtonProps> = ({
  navigateToScreen = "Settings",
  navigateToParams = "setting_main",
  navigateOptions,
  title = "Account",
}) => {
  const { navigator } = useContext(GlobalContext);
  const navigationChoice = navigateOptions == undefined ? { screen: navigateToParams } : navigateOptions
  console.log(navigateToScreen, navigateOptions, navigationChoice)
  return (
    <View
      style={{
        width: "100%",
        maxHeight: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 0,
        marginBottom: 5
      }}
    >
      <View style={{ position: "absolute", left: 0 }}>
        <ReturnButton
          onPress={() => {
            navigator.navigate(navigateToScreen, navigationChoice);
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={COLORS.standardBlack}
          />
        </ReturnButton>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderWithBackButton;
