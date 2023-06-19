import {
  TextInput,
  View,
  Text,
  Animated,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";
import styled, { css } from "styled-components/native";
import { COLORS, SPACE } from "./constants";
import React, { useState } from "react";
type SearchBarProps = {
  isFocused?: boolean;
};

export const SearchBar = styled(TextInput)<SearchBarProps>`
  background-color: ${COLORS.lightOrange};
  width: 100%;
  padding: ${SPACE.lg};
  border-radius: ${SPACE.roundMd};
  ${(props) =>
    props.isFocused &&
    css`
      background-color: ${COLORS.themeYellow};
    `}
`;

export const ResultsDropdown = styled(View)`
  position: absolute;
  padding: 5px;
`;

export const AGeneralTextInput = (props: TextInputProps) => {
  const styles = StyleSheet.create({
    generalAnimatedInput: {
      padding: SPACE.nativeLg,
      borderRadius: SPACE.nativeRoundMd,
      borderWidth: 1.5,
      borderStyle: "solid",
      borderColor: COLORS.darkGrey,
    },
  });

  const colorAnimation = useState(new Animated.Value(0))[0];
  const [isFocused, setFocused] = useState(false);

  const handleFocus = () => {
    animateBackgroundColor(1);
  };

  const handleBlur = () => {
    animateBackgroundColor(0);
  };
  const animateBackgroundColor = (toValue: number) => {
    Animated.timing(colorAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedTextInputStyle = {
    ...styles.generalAnimatedInput,
    backgroundColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightGrey, COLORS.lightOrange],
    }),
    borderColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.darkGrey, COLORS.themeYellow],
    }),
  };
  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View>
        <Animated.View style={animatedTextInputStyle}>
          <TextInput
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              padding: SPACE.nativeSm,
              opacity: isFocused ? 1 : 0.5,
              backgroundColor: "transparent",
            }}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
