import React, { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import { View } from "native-base";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";
import { SettingButton } from "../Settings";
import LogoSVG from "../../assets/svgComponents/LogoSVG";
import { GlobalContext } from "../../context/GlobalProvider";
import ShoppingCart from "../../assets/svgComponents/ShoppingCart";
import { COLORS } from "../../theme/constants";

const Plans = () => {
  const { navigator } = useContext(GlobalContext);
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View width={"80%"}>
          <HeaderWithBackButton
            title="Plans"
            navigateToScreen="Profile"
          />
          <View
            style={{
              marginTop: 20,
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 6,
              marginVertical: 5,
              backgroundColor: COLORS.lightGrey,
            }}
          >
            <Text style={{color: COLORS.darkGrey}}>Current Plan: Free</Text>
          </View>
          <SettingButton
            title="Upgrade Plan"
            onPress={() => navigator.navigate("plans-detail")}
            Icon={<ShoppingCart width="24" height="24" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Plans;
