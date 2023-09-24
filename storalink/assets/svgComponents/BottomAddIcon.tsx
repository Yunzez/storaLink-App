import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AddIcon } from "native-base";
import { COLORS } from "../../theme/constants";
import { hexToRGBA } from "../../utils";
type BottomAddIconProps = {
  focus: boolean;
  width?: number;
  height?: number;
};
const BottomAddIcon = (props: BottomAddIconProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    rhombus: {
      width: props.width ?? 40,
      height: props.height ?? 40,
      backgroundColor: "transparent",
      transform: [{ rotate: "45deg" }],
      borderRadius: 9,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: props.focus ? COLORS.themeYellow : COLORS.white,
    },
    iconContainer: {
      backgroundColor: props.focus ? COLORS.themeYellow : 'transparent',
      borderRadius: 100,
      borderWidth: 2,
      borderColor: COLORS.white,
      padding: 5,
      transform: [{ rotate: "-45deg" }],
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={
          props.focus
            ? [COLORS.white, COLORS.lightOrange]
            : [COLORS.themeYellow, hexToRGBA(COLORS.themeYellow, 0.4)]
        }
        style={styles.rhombus}
      >
        <View style={styles.iconContainer}>
          <AddIcon
            color= {COLORS.white }
            width={33}
            height={33}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default BottomAddIcon;
