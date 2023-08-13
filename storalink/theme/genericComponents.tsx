import {
  TextInput,
  View,
  Text,
  Animated,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import styled, { css } from "styled-components/native";
import { COLORS, SPACE } from "./constants";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalProvider";
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

interface AGeneralTextInputProps extends TextInputProps {
  multiline?: boolean; // Add the "multiline" prop to the AGeneralTextInputProps interface
  numberOfLines? : number
}


export const AGeneralTextInput = (props: AGeneralTextInputProps) => {
  const {screenHeight} = useContext(GlobalContext)
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
            multiline={props.multiline}
            numberOfLines={props.numberOfLines} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              minHeight: props.multiline ? screenHeight*0.19 : 0,
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

type AGeneralErrorBlockProps = {
  errorText: string;
};

export const RetrunButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  background-color: ${COLORS.lightOrange};
  border-radius: ${SPACE.roundMd};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NormalTitle = styled(Text)`
font-size: 18px;
font-weight: 400;
`

export const AGeneralErrorBlock = (props: AGeneralErrorBlockProps) => {
  const styles = StyleSheet.create({
    animatedTextInputStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: SPACE.nativeLg,
      borderRadius: SPACE.nativeRoundMd,
      borderWidth: 1.5,
      borderStyle: "solid",
    },
  });
  const { errorText } = props;
  const colorAnimation = useState(new Animated.Value(0))[0];
  const opacityAnimation = useState(new Animated.Value(0))[0];
  const animatedTextInputStyle = {
    ...styles.animatedTextInputStyle,
    backgroundColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightGrey, COLORS.lowerWarning],
    }),
    height: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 45], // Adjust the initial and final height values
    }),
    borderColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightGrey, COLORS.highWarning],
    }),
  };

  const opacityAnimationStyle = {
    opacity: opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const animateBackgroundColorandHeight = (toValue: number) => {
    Animated.parallel([
      Animated.timing(opacityAnimation, {
        duration: 200,
        toValue,
        useNativeDriver: false,
      }),
      Animated.spring(colorAnimation, {
        toValue,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (errorText.length > 0) {
      animateBackgroundColorandHeight(1);
    } else {
      animateBackgroundColorandHeight(0);
    }
  }, [errorText]);
  return (
    <Animated.View style={[animatedTextInputStyle, opacityAnimationStyle]}>
      <Text
        style={{ fontSize: 20, fontWeight: "500", color: COLORS.highWarning }}
      >
        {errorText}
      </Text>
    </Animated.View>
  );
};
