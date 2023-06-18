import React, { useState } from "react";
import { SearchBar, ResultsDropdown } from "../theme/genericComponents";
import { StyleSheet } from "react-native";
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
  const [showResults, setShowResults] = useState(false);
  const [value, setValue] = useState("");

  const colorAnimation = useState(new Animated.Value(0))[0];

  const styles = StyleSheet.create({
    animatedSearchBar: {
      width: "80%",
      zIndex: 999,
      flexDirection: "row",
      justifyContent: "center",
      display: "flex",
      borderRadius: 8,
    },
  });

  const animatedSearchBarStyle = {
    ...styles.animatedSearchBar,
    backgroundColor: colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightOrange, COLORS.themeYellow],
    }),
  };

  const handleFocus = () => {
    setFocus(true);
    animateBackgroundColor(1);
    if (value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleBlur = () => {
    setFocus(false);
    setShowResults(false);
    animateBackgroundColor(0);
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    setShowResults(text.length > 0);
  };

  const animateBackgroundColor = (toValue: number) => {
    Animated.timing(colorAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
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
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ResultsDropdown show={showResults}>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
        </ResultsDropdown>
      </View>
    </View>
  );
};

export default SearchComponent;
