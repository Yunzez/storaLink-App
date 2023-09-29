import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";
import { Text } from "native-base";

interface ProgressBarProps {
  progress: number; // Progress percentage between 0 and 100
  fillColor: string; // Color of the filled part
  statusText: string;
}

const Container = styled.View`
  width: 100%;
  height: 26px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 3px;
  border: 1px solid black;
`;

const Filler = styled(Animated.View)<{ color: string }>`
  height: 100%;
  background-color: ${(props) => props.color};
`;

const Wrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  fillColor,
  statusText,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const widthAnim = useRef(new Animated.Value(0)).current; // Initial value for width: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [statusText, progress]);

  return (
    <Wrapper>
      <Container>
        <Filler
          style={
            {
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            borderRadius: 8,
          }}
          color={fillColor}
        />
      </Container>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={{ color: fillColor, fontSize: 18, fontWeight: "500" }}>
          {statusText}
        </Text>
      </Animated.View>
    </Wrapper>
  );
};

export default ProgressBar;
