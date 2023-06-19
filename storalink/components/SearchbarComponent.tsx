import React, { useState } from "react";
import { SearchBar, ResultsDropdown } from "../theme/genericComponents";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  SafeAreaView,
  Text,
  View,
  Animated,
  Easing,
  ViewStyle,
  StyleProp,
} from "react-native";
import { COLORS, SPACE } from "../theme/constants";

type SearchComponentProps = {
  placeHolder: string;
};
export const SearchComponent = (props: SearchComponentProps) => {
  const [isFocused, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const colorAnimation = useState(new Animated.Value(0))[0];
  const heightAnimation = useState(new Animated.Value(0))[0];
  const textOpacityAnimation = useState(new Animated.Value(0))[0];
  const styles = StyleSheet.create({
    animatedSearchBar: {
      width: "80%",
      zIndex: 999,
      flexDirection: "row",
      justifyContent: "center",
      display: "flex",
      borderRadius: 8,
    },
    animatedDropDownBar: {
      width: "80%",
      position: 'absolute',
      padding: SPACE.nativeLg,
      borderRadius: SPACE.nativeRoundMd,
      marginBottom: 15,
      backgroundColor: COLORS.lightGrey,
      shadowColor: COLORS.darkGrey,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
      
    },
  });

  const animatedSearchBarStyle = {
    ...styles.animatedSearchBar,
    backgroundColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightGrey, COLORS.lightOrange],
    }),
    borderColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightGrey, COLORS.themeYellow],
    }),
    borderWidth: 2
  };

  const animatedDropDownBar = {
    ...styles.animatedDropDownBar,
    height: heightAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    }),
  };

  const handleFocus = () => {
    setFocus(true);
    animateBackgroundColor(1);
    if (value.length > 0) {
      animateDropDownHeight(1);
    } else {
      animateDropDownHeight(0);
    }
  };

  const handleBlur = () => {
    console.log("blur");
    setFocus(false);
    animateBackgroundColor(0);
    animateDropDownHeight(0);
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    text.length > 0 ? animateDropDownHeight(1) : animateDropDownHeight(0);
  };

  const animateBackgroundColor = (toValue: number) => {
    Animated.timing(colorAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedTextOpacity = {
    opacity: textOpacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const animateDropDownHeight = (toValue: number) => {
    Animated.parallel([
      Animated.timing(heightAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacityAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={{ width: "100%", zIndex: 999 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <TouchableWithoutFeedback onPress={handleBlur}>
          <Animated.View style={animatedSearchBarStyle}>
            <SearchBar
              placeholder={props.placeHolder}
              isFocused={isFocused}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleChangeText}
              style={{ backgroundColor: "transparent" }} // Set the background color of SearchBar to transparent
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Animated.View style={[animatedDropDownBar, animatedTextOpacity]}>
          <ResultsDropdown>
            <Animated.Text style={animatedTextOpacity}>test</Animated.Text>
            <Animated.Text style={animatedTextOpacity}>test</Animated.Text>
            <Animated.Text style={animatedTextOpacity}>test</Animated.Text>
            <Animated.Text style={animatedTextOpacity}>test</Animated.Text>
            <Animated.Text style={animatedTextOpacity}>test</Animated.Text>
          </ResultsDropdown>
        </Animated.View>
      </View>
    </View>
  );
};

export default SearchComponent;
