import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { COLORS, SPACE } from "../theme/constants";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type OutLinedButtonProps = {
  onClick: () => void;
  text: string;
  style?: StyleProp<ViewStyle>; // Update the type declaration here
};

const OutLinedButton = ({ onClick, text, style }: OutLinedButtonProps) => {
  const buttonStyle = StyleSheet.compose(
    {
      borderColor: COLORS.themeYellow,
      borderRadius: SPACE.nativeRoundSm,
      borderWidth: 1,
      padding: 4,
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
      <Text style={{ color: COLORS.themeYellow }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default OutLinedButton;
