import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RetrunButton } from "../theme/genericComponents";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";

type HeaderWithBackButtonProps = {
  navigateToScreen?: string;
  navigateToParams?: string;
  title?: string;
};

const HeaderWithBackButton: React.FC<HeaderWithBackButtonProps> = ({
  navigateToScreen = "Settings",
  navigateToParams = "setting_main",
  title = "Account",
}) => {
  const { navigator } = useContext(GlobalContext);

  return (
    <View
      style={{
        width: "100%",
        maxHeight: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 0
      }}
    >
      <View style={{ position: "absolute", left: 0 }}>
        <RetrunButton
          onPress={() => {
            navigator.navigate(navigateToScreen, { screen: navigateToParams });
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={COLORS.standardBlack}
          />
        </RetrunButton>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderWithBackButton;
