import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
} from "react-native";
import { COLORS, SPACE } from "../theme/constants";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type OutLinedButtonProps = {
  onClick: () => void;
  text: string;
  style?: StyleProp<ViewStyle>; // Update the type declaration here
  icon: React.JSX.Element;
};

const OutLinedButton = ({
  icon,
  onClick,
  text,
  style,
}: OutLinedButtonProps) => {
  const buttonStyle = StyleSheet.compose(
    {
      borderColor: COLORS.themeYellow,
      borderRadius: SPACE.nativeRoundSm,
      borderWidth: 1,
      padding: 4,
      justifyContent:'center'
    },
    style
  );

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => {
        onClick();
      }}
    >
      <View style={{flexDirection:'row', justifyContent:'space-between', alignContent: 'center', alignItems:'center'}}>
        {icon}
        <Text style={{ color: COLORS.themeYellow }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OutLinedButton;
