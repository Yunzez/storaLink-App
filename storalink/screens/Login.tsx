import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput, SafeAreaView, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { GlobalContext } from "../context/GlobalProvider";
import { SPACE, COLORS } from "../theme/constants";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const Container = styled(SafeAreaView)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  padding: ${SPACE.lg};
  border: 1px solid #ddd;
  margin-bottom: 12px;
  border-radius: ${SPACE.roundMd};
`;

const SignInBtnContainer = styled(View)`
  background-color: ${COLORS.themeYellow};
  border-radius: ${SPACE.roundMd};
  padding: ${SPACE.lg};
  margin-top: ${SPACE.lg};
  margin-bottom: ${SPACE.lg};
`;

const StyledCheckbox = styled(Checkbox)`
  border-radius: ${SPACE.roundSm};
  padding: ${SPACE.sm};
  margin-right: ${SPACE.sm};
`;

const SignInText = styled(Text)`
  color: blue;
  text-decorationline: underline;
  marginleft: 8px;
`;

export const Login = () => {


  const { navigator } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remeber, setRemenber] = useState(false);
  const handleLogin = () => {
    // Handle login action here
    navigator.navigate("Home");
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <Container>
      <View style={{ width: "75%", justifyContent: "center" }}>
        <StyledInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />

        <StyledInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <View style={{ flexDirection: "row", width: "100%" }}>
          <StyledCheckbox
            disabled={false}
            value={remeber}
            onValueChange={(newValue) => setRemenber(newValue)}
            color={remeber ? COLORS.themeYellow : undefined}
          />
          <Text>Remember Me</Text>
        </View>

        <SignInBtnContainer>
          <Button
            title="Login"
            color={COLORS.standardBlack}
            onPress={handleLogin}
          />
        </SignInBtnContainer>
        <View style={{ flexDirection: "row", marginTop: "12pt" }}>
          <Text>Have an Account?</Text>
          <SignInText>Sign In</SignInText>
        </View>
        
        <Button
          title="Go test"
          onPress={() => {
            navigator.navigate("Test");
          }}
          color={COLORS.standardBlack}
        />
      </View>
    </Container>
  );
};

export default Login;
