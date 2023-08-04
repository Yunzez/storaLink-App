import React, { useState } from "react";
import { SearchBar, ResultsDropdown } from "../theme/genericComponents";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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
  algorithm?: (searchInput: string) => Map<string, any>;
};
export const SearchComponent = (props: SearchComponentProps) => {
  const [isFocused, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const initialResultMap = new Map<string, any>();
  initialResultMap.set("if you see this", 1);
  initialResultMap.set("it means there is no algorithm for filtering", 2);

  const [result, setResult] = useState<Map<string, any>>(initialResultMap);
  const colorAnimation = useState(new Animated.Value(0))[0];
  const heightAnimation = useState(new Animated.Value(0))[0];
  const textOpacityAnimation = useState(new Animated.Value(0))[0];
  const styles = StyleSheet.create({
    animatedSearchBar: {
      width: "100%",
      zIndex: 999,
      flexDirection: "row",
      justifyContent: "center",
      display: "flex",
      borderRadius: 8,
    },
    animatedDropDownBar: {
      width: "100%",
      position: "absolute",
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
      elevation: 1000,
      zIndex: 10,
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
    borderWidth: 2,
  };

  const animatedDropDownBar = {
    ...styles.animatedDropDownBar,
    height: heightAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    }),
    opcity: 1,
    borderColor: COLORS.highWarning,
    borderWidth: 1,
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
    const newValues = props.algorithm?.(value);
    if (newValues) {
      setValue(newValues);
    }
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
    padding: 2,
    borderRadius: SPACE.nativeSm,
  };

  const handleTextTouchIn = () => {
    // Handle TouchableOpacity touch-in event (hover effect start)
    Animated.timing(textOpacityAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleTextTouchOut = () => {
    // Handle TouchableOpacity touch-out event (hover effect end)
    Animated.timing(textOpacityAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const animatedTextTouchable = {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 2,
    borderRadius: SPACE.nativeRoundSm,
    backgroundColor: COLORS.darkGrey, // Add a background color to the button
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
    <View style={{ width: "100%", zIndex: 1000 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          display: "flex",
          width: "100%",
          zIndex: 1000,
          elevation: 1000,
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
          zIndex: 100,
          opacity: 1,
        }}
      >
        <Animated.View style={[animatedDropDownBar, animatedTextOpacity]}>
          <ResultsDropdown>
            {Array.from(result.keys()).map((key) => (
              <TouchableOpacity
                key={key} // Make sure to provide a unique key for each element
                onPress={handleTextTouchIn}
                onPressOut={handleTextTouchOut}
                style={animatedTextTouchable}
              >
                <Text>{key}</Text>
              </TouchableOpacity>
            ))}
          </ResultsDropdown>
        </Animated.View>
      </View>
    </View>
  );
};

export default SearchComponent;
